type ActiveJoin = {
  userId: string;
  joinedAt: number; // timestamp ms
};

export type SessionState = {
  bookingId: string;
  // single session channel id
  channelId: string;
  guildId: string;
  totalSeconds: number;
  activeJoins: ActiveJoin[];
};

class SessionStore {
  private sessions = new Map<string, SessionState>(); // key: bookingId

  createSession(state: Omit<SessionState, 'totalSeconds' | 'activeJoins'>) {
    const session: SessionState = {
      ...state,
      totalSeconds: 0,
      activeJoins: [],
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
    this.sessions.delete(bookingId);
    return s;
  }

  handleUserJoin(channelId: string, userId: string, at: number) {
    const session = this.findByChannel(channelId);
    if (!session) return;
    // Avoid duplicates
    if (session.activeJoins.some((j) => j.userId === userId)) return;
    session.activeJoins.push({ userId, joinedAt: at });
  }

  handleUserLeave(channelId: string, userId: string, at: number) {
    const session = this.findByChannel(channelId);
    if (!session) return;
    const idx = session.activeJoins.findIndex((j) => j.userId === userId);
    if (idx === -1) return;

    const join = session.activeJoins[idx];
    const deltaSeconds = Math.max(0, Math.floor((at - join.joinedAt) / 1000));
    session.totalSeconds += deltaSeconds;
    session.activeJoins.splice(idx, 1);
  }
}

export const sessionStore = new SessionStore();


