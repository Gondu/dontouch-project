export interface Match {
    _doc?: string;
    id?: number;
    _sid?: number;
    _rcid?: number;
    _tid?: number;
    _utid?: number;
    time: {
      _doc?: string;
      time: string;
      date: string;
      tz?: string;
      tzoffset?: number;
      uts?: number;
    };
    round?: number;
    roundname?: {
      _doc?: string;
      id?: number;
      name?: number;
    };
    week?: number;
    result: {
      home: number;
      away: number;
      period?: string;
      winner?: string;
    };
    periods?: {
      p1?: {
        home?: number;
        away?: number;
      };
      ft?: {
        home?: number;
        away?: number;
      }
    };
    _seasonid?: number;
    teams: {
      home: {
        _doc?: string;
        id?: number;
        _sid?: number;
        uid?: number;
        virtual?: boolean;
        name: string;
        mediumname?: string;
        abbr?: string;
        nickname?: string | null;
        iscountry?: boolean;
        haslogo?: boolean;
      };
      away: {
        _doc?: string;
        id?: number;
        _sid?: number;
        uid?: number;
        virtual?: boolean;
        name: string;
        mediumname?: string;
        abbr?: string;
        nickname?: string | null;
        iscountry?: boolean;
        haslogo?: boolean;
      }
    };
    neutralground?: boolean;
    comment?: string;
    status?: string | null;
    tobeannounced?: boolean;
    postponed?: boolean;
    canceled?: boolean;
    inlivescore?: boolean;
    stadiumid?: number;
    bestof?: string | null;
    walkover?: boolean;
    retired?: boolean;
    disqualified?: boolean;
  }