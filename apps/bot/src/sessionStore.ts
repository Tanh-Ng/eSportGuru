type ActiveJoin = {
  userId: string;
  joinedAt: number; // timestamp ms
};

export type SessionState = {
  bookingId: string;
  channelId: string;
  guildId: string;
  totalSeconds: number;
  activeJoins: ActiveJoin[];
  // Timer fields
  durationMinutes: number; // Thời gian cố định của khóa học (phút)
  elapsedSeconds: number; // Tổng thời gian đã trôi qua (chỉ tính khi có người)
  timerStartTime: number | null; // Timestamp khi timer bắt đầu (null nếu đang pause)
  timerTimeout: NodeJS.Timeout | null; // Timeout để xóa phòng khi hết giờ
};

class SessionStore {
  private sessions = new Map<string, SessionState>(); // key: bookingId

  createSession(state: Omit<SessionState, 'totalSeconds' | 'activeJoins' | 'elapsedSeconds' | 'timerStartTime' | 'timerTimeout'>) {
    const session: SessionState = {
      ...state,
      totalSeconds: 0,
      activeJoins: [],
      elapsedSeconds: 0,
      timerStartTime: null,
      timerTimeout: null,
    };
    this.sessions.set(state.bookingId, session);
    return session;
  }

  getSession(bookingId: string) {
    return this.sessions.get(bookingId);
  }

  findByChannel(channelId: string) {
    for (const s of this.sessions.values()) {
      if (s.channelId === channelId) return s;
    }
    return undefined;
  }

  deleteSession(bookingId: string) {
    const s = this.sessions.get(bookingId);
    if (s?.timerTimeout) {
      clearTimeout(s.timerTimeout);
    }
    this.sessions.delete(bookingId);
    return s;
  }

  // Bắt đầu timer khi có người đầu tiên join
  startTimer(bookingId: string, onExpire: (session: SessionState) => void) {
    const session = this.sessions.get(bookingId);
    if (!session || session.timerStartTime !== null) return; // Đã đang chạy

    const now = Date.now();
    session.timerStartTime = now;

    // Tính thời gian còn lại (milliseconds)
    const remainingMs = (session.durationMinutes * 60 - session.elapsedSeconds) * 1000;

    if (remainingMs <= 0) {
      // Đã hết thời gian rồi, expire ngay
      onExpire(session);
      return;
    }

    // Set timeout để xóa phòng khi hết giờ
    session.timerTimeout = setTimeout(() => {
      onExpire(session);
    }, remainingMs);

    const remainingMinutes = Math.floor((session.durationMinutes * 60 - session.elapsedSeconds) / 60);
    console.log(`[bot] Timer started for ${bookingId}, ${remainingMinutes} minutes remaining`);
  }

  // Pause timer khi không còn ai trong phòng
  pauseTimer(bookingId: string) {
    const session = this.sessions.get(bookingId);
    if (!session || session.timerStartTime === null) return; // Không đang chạy

    const now = Date.now();
    const elapsed = Math.floor((now - session.timerStartTime) / 1000);
    session.elapsedSeconds += elapsed;
    session.timerStartTime = null;

    if (session.timerTimeout) {
      clearTimeout(session.timerTimeout);
      session.timerTimeout = null;
    }

    const remainingSeconds = session.durationMinutes * 60 - session.elapsedSeconds;
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    console.log(`[bot] Timer paused for ${bookingId}, ${session.elapsedSeconds}s elapsed, ${remainingMinutes}m ${remainingSeconds % 60}s remaining`);
  }

  handleUserJoin(channelId: string, userId: string, at: number, onTimerStart?: (bookingId: string) => void) {
    const session = this.findByChannel(channelId);
    if (!session) return;
    
    // Avoid duplicates
    if (session.activeJoins.some((j) => j.userId === userId)) return;
    session.activeJoins.push({ userId, joinedAt: at });

    // Nếu đây là người đầu tiên join → bắt đầu timer
    if (session.activeJoins.length === 1 && onTimerStart) {
      this.startTimer(session.bookingId, onTimerStart);
    }
  }

  handleUserLeave(channelId: string, userId: string, at: number, onTimerPause?: (bookingId: string) => void) {
    const session = this.findByChannel(channelId);
    if (!session) return;
    
    const idx = session.activeJoins.findIndex((j) => j.userId === userId);
    if (idx === -1) return;

    const join = session.activeJoins[idx];
    const deltaSeconds = Math.max(0, Math.floor((at - join.joinedAt) / 1000));
    session.totalSeconds += deltaSeconds;
    session.activeJoins.splice(idx, 1);

    // Nếu không còn ai trong phòng → pause timer
    if (session.activeJoins.length === 0 && onTimerPause) {
      this.pauseTimer(session.bookingId);
    }
  }
}

export const sessionStore = new SessionStore();


