interface ShortTeamInfo {
    id: Number;
    name: String;
    link: String;
}

interface ShortPlayerInfo {
    id: Number;
    fullName: String;
    link: String;
}

interface ShortSportInfo {
    id: Number;
    name: String;
    link: String;
}

enum PrimaryPostionCode {
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    X = "X",
}

interface PrimaryPositionInfo {
    code: PrimaryPostionCode;
    name: String;
    type: String;
    abbreviation: String;
}

enum BatSideCode {
    L = "L",
    R = "R",
    S = "S",
}

enum BatSideDescription {
    Left = "Left",
    Right = "Right",
    Switch = "Switch",
}

interface BatSideInfo {
    code: BatSideCode;
    description: BatSideDescription;
}

enum PitchHandCode {
    L = "L",
    R = "R",
    S = "S",
}

enum PitchHandDescription {
    Left = "Left",
    Right = "Right",
    Switch = "Switch",
}

interface PitchHandInfo {
    code: PitchHandCode;
    description: PitchHandDescription;
}

interface PlayerInfo {
    id: Number;
    fullName: String;
    link: String;
    firstName: String;
    lastName: String;
    primaryNumber: Number;
    birthDate: String;
    currentAge: Number;
    birthCity: String;
    birthStateProvince: String;
    birthCountry: String;
    height: String;
    weight: Number;
    active: Boolean;
    currentTeam: ShortTeamInfo;
    primaryPosition: PrimaryPositionInfo;
    useName: String;
    isPlayer: Boolean;
    isVerified: Boolean;
    draftYear: Number;
    mlbDebutDate: String;
    batSide: BatSideInfo;
    pitchHand: PitchHandInfo;
    nameFirstLast: String;
    nameSlug: String;
    firstLastName: String;
    lastFirstName: String;
    initLastName: String;
    fullFMLName: String;
    fullLFMName: String;
    strikeZoneTop: Number;
    strikeZoneBottom: Number;
}

interface StatsType {
    displayName: String;
}

enum StatsGroupDisplayName {
    hitting = "hitting",
    pitching = "pitching",
    fielding = "fielding",
}

interface StatsGroup {
    displayName: StatsGroupDisplayName;
}

interface SeasonHittingStats {
    gamesPlayed: Number;
    groundOuts: Number;
    airOuts: Number;
    runs: Number;
    doubles: Number;
    triples: Number;
    homeRuns: Number;
    strikeOuts: Number;
    baseOnBalls: Number;
    intentionalWalks: Number;
    hits: Number;
    hitByPitch: Number;
    avg: String;
    obp: String;
    slg: String;
    ops: String;
    caughtStealing: Number;
    stolenBases: Number;
    stolenBasePercentage: String;
    groundIntoDoublePlay: Number;
    numberOfPitches: Number;
    plateAppearances: Number;
    totalBases: Number;
    totalBases: Number;
    rbi: Number;
    leftOnBase: Number;
    sacBunts: Number;
    sacFlies: Number;
    bapib: String;
    groundOutsToAirOuts: String;
    catchersInterference: Number;
    atBatsPerHomeRun: String;
}

enum GameTypes {
    R = "R",
    S = "S",
    E = "E",
    A = "A",
    D = "D",
    F = "F",
    L = "L",
    W = "W",
}

interface PlayerSeasonHittingSplit {
    season: String;
    stat: SeasonHittingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
}

interface SeasonPitchingStats {
    gamesPlayed: Number;
    groundOuts: Number;
    airOuts: Number;
    runs: Number;
    doubles: Number;
    triples: Number;
    homeRuns: Number;
    strikeOuts: Number;
    baseOnBalls: Number;
    intentionalWalks: Number;
    hits: Number;
    hitByPitch: Number;
    avg: String;
    atBats: Number;
    obp: String;
    slg: String;
    ops: String;
    caughtStealing: Number;
    stolenBases: Number;
    stolenBasePercentage: String;
    groundIntoDoublePlay: Number;
    numberOfPitches: Number;
    era: String;
    inningsPitched: String;
    wins: Number;
    losses: Number;
    saves: Number;
    saveOpportunities: Number;
    holds: Number;
    blownSaves: Number;
    earnedRuns: Number;
    whip: String;
    battersFaced: Number;
    outs: Number;
    gamesPitched: Number;
    completeGames: Number;
    shutouts: Number;
    strikes: Number;
    strikePercentage: String;
    hitBatsmen: Number;
    balks: Number;
    wildPitches: Number;
    pickoffs: Number;
    totalBases: Number;
    groundOutsToAirOuts: String;
    winPercentage: String;
    pitchesPerInning: String;
    gamesFinished: Number;
    strikeoutWalkRatio: String;
    strikeoutsPer9Innings: String;
    walksPer9Inn: String;
    hitsPer9Inn: String;
    runsScoredPer9: String;
    homeRunsPer9: String;
    inheritedRunners: Number;
    inheritedRunnersScored: Number;
    catchersInterference: Number;
    sacBunts: Number;
    sacFlies: Number;
}

interface PlayerSeasonPitchingSplit {
    season: String;
    stat: SeasonPitchingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
}

interface SeasonFieldingStats {
    assists: Number;
    putOuts: Number;
    errors: Number;
    chances: Number;
    fielding: String;
    position: PrimaryPositionInfo;
    rangeFacterPerGame: String;
    rangeFactorPer9Inn: String;
    games: Number;
    gamesStarted: Number;
    doublePlays: Number;
    triplePlays: Number;
    throwingErrors: Number;
}

interface PlayerSeasonFieldingSplit {
    season: String;
    stat: SeasonFieldingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
    position: PrimaryPositionInfo;
}

interface CareerHittingStats {
    gamesPlayed: Number;
    groundOuts: Number;
    airOuts: Number;
    runs: Number;
    doubles: Number;
    triples: Number;
    homeRuns: Number;
    strikeOuts: Number;
    baseOnBalls: Number;
    intentionalWalks: Number;
    hits: Number;
    hitByPitch: Number;
    avg: String;
    obp: String;
    slg: String;
    ops: String;
    caughtStealing: Number;
    stolenBases: Number;
    stolenBasePercentage: String;
    groundIntoDoublePlay: Number;
    numberOfPitches: Number;
    plateAppearances: Number;
    totalBases: Number;
    totalBases: Number;
    rbi: Number;
    leftOnBase: Number;
    sacBunts: Number;
    sacFlies: Number;
    bapib: String;
    groundOutsToAirOuts: String;
    catchersInterference: Number;
    atBatsPerHomeRun: String;
}

interface PlayerCareerHittingSplit {
    stat: CareerHittingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
}

interface CareerPitchingStats {
    gamesPlayed: Number;
    groundOuts: Number;
    airOuts: Number;
    runs: Number;
    doubles: Number;
    triples: Number;
    homeRuns: Number;
    strikeOuts: Number;
    baseOnBalls: Number;
    intentionalWalks: Number;
    hits: Number;
    hitByPitch: Number;
    avg: String;
    atBats: Number;
    obp: String;
    slg: String;
    ops: String;
    caughtStealing: Number;
    stolenBases: Number;
    stolenBasePercentage: String;
    groundIntoDoublePlay: Number;
    numberOfPitches: Number;
    era: String;
    inningsPitched: String;
    wins: Number;
    losses: Number;
    saves: Number;
    saveOpportunities: Number;
    holds: Number;
    blownSaves: Number;
    earnedRuns: Number;
    whip: String;
    battersFaced: Number;
    outs: Number;
    gamesPitched: Number;
    completeGames: Number;
    shutouts: Number;
    strikes: Number;
    strikePercentage: String;
    hitBatsmen: Number;
    balks: Number;
    wildPitches: Number;
    pickoffs: Number;
    totalBases: Number;
    groundOutsToAirOuts: String;
    winPercentage: String;
    pitchesPerInning: String;
    gamesFinished: Number;
    strikeoutWalkRatio: String;
    strikeoutsPer9Innings: String;
    walksPer9Inn: String;
    hitsPer9Inn: String;
    runsScoredPer9: String;
    homeRunsPer9: String;
    inheritedRunners: Number;
    inheritedRunnersScored: Number;
    catchersInterference: Number;
    sacBunts: Number;
    sacFlies: Number;
}

interface PlayerCareerPitchingSplit {
    stat: CareerPitchingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
}

interface CareerFieldingStats {
    assists: Number;
    putOuts: Number;
    errors: Number;
    chances: Number;
    fielding: String;
    position: PrimaryPositionInfo;
    rangeFacterPerGame: String;
    rangeFactorPer9Inn: String;
    games: Number;
    gamesStarted: Number;
    doublePlays: Number;
    triplePlays: Number;
    throwingErrors: Number;
}

interface PlayerCareerFieldingSplit {
    stat: CareerFieldingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
    position: PrimaryPositionInfo;
}

interface GameHittingStats {
    gamesPlayed: Number;
    groundOuts: Number;
    airOuts: Number;
    runs: Number;
    doubles: Number;
    triples: Number;
    homeRuns: Number;
    strikeOuts: Number;
    baseOnBalls: Number;
    intentionalWalks: Number;
    hits: Number;
    hitByPitch: Number;
    avg: String;
    obp: String;
    slg: String;
    ops: String;
    caughtStealing: Number;
    stolenBases: Number;
    stolenBasePercentage: String;
    groundIntoDoublePlay: Number;
    numberOfPitches: Number;
    plateAppearances: Number;
    totalBases: Number;
    totalBases: Number;
    rbi: Number;
    leftOnBase: Number;
    sacBunts: Number;
    sacFlies: Number;
    bapib: String;
    groundOutsToAirOuts: String;
    catchersInterference: Number;
    atBatsPerHomeRun: String;
}

interface GamePitchingStats {
    gamesPlayed: Number;
    groundOuts: Number;
    airOuts: Number;
    runs: Number;
    doubles: Number;
    triples: Number;
    homeRuns: Number;
    strikeOuts: Number;
    baseOnBalls: Number;
    intentionalWalks: Number;
    hits: Number;
    hitByPitch: Number;
    avg: String;
    atBats: Number;
    obp: String;
    slg: String;
    ops: String;
    caughtStealing: Number;
    stolenBases: Number;
    stolenBasePercentage: String;
    groundIntoDoublePlay: Number;
    numberOfPitches: Number;
    era: String;
    inningsPitched: String;
    wins: Number;
    losses: Number;
    saves: Number;
    saveOpportunities: Number;
    holds: Number;
    blownSaves: Number;
    earnedRuns: Number;
    whip: String;
    battersFaced: Number;
    outs: Number;
    gamesPitched: Number;
    completeGames: Number;
    shutouts: Number;
    strikes: Number;
    strikePercentage: String;
    hitBatsmen: Number;
    balks: Number;
    wildPitches: Number;
    pickoffs: Number;
    totalBases: Number;
    groundOutsToAirOuts: String;
    winPercentage: String;
    pitchesPerInning: String;
    gamesFinished: Number;
    strikeoutWalkRatio: String;
    strikeoutsPer9Innings: String;
    walksPer9Inn: String;
    hitsPer9Inn: String;
    runsScoredPer9: String;
    homeRunsPer9: String;
    inheritedRunners: Number;
    inheritedRunnersScored: Number;
    catchersInterference: Number;
    sacBunts: Number;
    sacFlies: Number;
}

interface PlayerGameHittingSplit {
    stat: GameHittingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
}

interface PlayerGamePitchingSplit {
    stat: GamePitchingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
}

interface GameFieldingStats {
    assists: Number;
    putOuts: Number;
    errors: Number;
    chances: Number;
    fielding: String;
    position: PrimaryPositionInfo;
    rangeFacterPerGame: String;
    rangeFactorPer9Inn: String;
    games: Number;
    gamesStarted: Number;
    doublePlays: Number;
    triplePlays: Number;
    throwingErrors: Number;
}

interface PlayerGameFieldingSplit {
    stat: GameFieldingStats;
    team: ShortTeamInfo;
    player: ShortPlayerInfo;
    league: ShortSportInfo;
    sport: ShortSportInfo;
    gameType: GameTypes;
    position: PrimaryPositionInfo;
}

enum PlayerSeasonSplits {
    PlayerSeasonPitchingSplit,
    PlayerSeasonHittingSplit,
    PlayerSeasonFieldingSplit,
}

interface PlayerSeasonStats {
    type: StatsType;
    group: StatsGroup;
    exemptions: Array;
    splits: Array<PlayerSeasonSplits>;
}

enum PlayerCareerSplits {
    PlayerCareerPitchingSplit,
    PlayerCareerHittingSplit,
    PlayerCareerFieldingSplit,
}

interface PlayerCareerStats {
    type: StatsType;
    group: StatsGroup;
    exemptions: Array;
    splits: Array<PlayerCareerSplits>;
}

enum PlayerGameSplits {
    PlayerGamePitchingSplit,
    PlayerGameHittingSplit,
    PlayerGameFieldingSplit,
}

interface PlayerGameStats {
    type: StatsType;
    group: StatsGroup;
    exemptions: Array;
    splits: Array<PlayerGameSplits>;
}

interface FreeAgent {
    player: ShortPlayerInfo;
    originalTeam: ShortTeamInfo;
    notes?: String;
    dateSigned?: String;
    dateDeclared: String;
    position: PrimaryPositionInfo;
}