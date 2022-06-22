'use strict';
const { Api, Error, TypeError } = require('../index');

/**
 * Class for managing players.
 * @class PlayerManager
 * @extends Api
 */
class PlayerManager extends Api {
    /**
     * Object with short info about a player's team
     * @typedef ShortTeamInfo
     * @prop {Number} id The id of the team
     * @prop {String} name The name of the team
     * @prop {String} link The api endpoint to the team
     */

    /** 
     * Object with short info about a player
     * @typedef ShortPlayerInfo
     * @prop {Number} id The id of the player
     * @prop {String} fullName The full name of the player
     * @prop {String} link The api endpoint to the player
     */

    /** 
     * Object with short info about a league
     * @typedef ShortLeagueInfo
     * @prop {Number} id The id of the league
     * @prop {String} name The name of the league
     * @prop {String} link The api endpoint to the league
     */

    /** 
     * Object with short info about a sport
     * @typedef ShortSportInfo
     * @prop {Number} id The id of the sport
     * @prop {String} name The name of the sport
     * @prop {String} link The api endpoint to the sport
     */

    /** 
     * Object with info about a player's position
     * @typedef PrimaryPositionInfo
     * @prop {(1|2|3|4|5|6|7|8|9|'X')} code The code of the associated position
     * @prop {String} name The name of the associated position
     * @prop {String} type The type of the associated position
     * @prop {String} abbreviation The abbreviation of the associated position's name
     */

    /** 
     * Object with info about a player's bat side
     * @typedef BatSideInfo
     * @prop {('L'|'R'|'S')} code The code of the player's bat side
     * @prop {('Left'|'Right'|'Switch')} description The description of the player's bat side
     */

    /** 
     * Object with info about a player's pitch hand
     * @typedef PitchHandInfo
     * @prop {('L'|'R'|'S')} code The code of the player's pitch hand
     * @prop {('Left'|'Right'|'Switch')} description The description of the player's pitch hand
     */

    /** 
     * Object with info about a player
     * @typedef PlayerInfo
     * @prop {Number} id The id of the player
     * @prop {String} fullName The full name of the player
     * @prop {String} link The api endpoint to the player
     * @prop {String} firstName The first name of the player
     * @prop {String} lastName The last name of the player
     * @prop {String} primaryNumber The primary number of the player
     * @prop {String} birthDate The date of birth of the player
     * @prop {String} currentAge The current age of the player at the time the request was made
     * @prop {String} birthCity The city of where the player was born
     * @prop {String} birthStateProvince The province of where the player was born
     * @prop {String} birthCountry The country of where the player was born
     * @prop {String} height The height of the player in feet
     * @prop {Number} weight The weight of the player in kilograms
     * @prop {Boolean} active Wether the player is active or not
     * @prop {ShortTeamInfo} currentTeam An object with information about the current team the player plays in
     * @prop {PrimaryPositionInfo} primaryPosition An object with information of the player's primary position
     * @prop {String} useName The used name of the player
     * @prop {String} middleName The middle name of the player
     * @prop {String} boxscoreName The used name in the box score
     * @prop {(M|F)} gender The gender of the player
     * @prop {String} nickName The nickname of the player
     * @prop {Boolean} isPlayer Wether the player is a player or not (always true in this manager)
     * @prop {Boolean} isVerified Wether the player is verified or not
     * @prop {Number} draftYear The year the player was drafted
     * @prop {String} mlbDebutDate The player's first debut in the majors
     * @prop {BatSideInfo} batSide An object with the information of the player's bat side
     * @prop {PitchHandInfo} pitchHand An object with the information of the player's pitch hand
     * @prop {String} nameFirstLast The player's first and last name ordered from first name to last name (e.g. C.J. Abrams)
     * @prop {String} nameSlug The player's name slug (e.g. c-j-abrams-682928)
     * @prop {String} firstLastName A copy of nameFirstLast, just another key
     * @prop {String} lastFirstName The player's first and last name separated from each other with a comma ordered from last name to first name (e.g. Abrams, C.J.)
     * @prop {String} lastInitName The player's first and last init name separated from each other with a comma ordered from last name to first name (e.g. Abrams, C)
     * @prop {String} initLastName The player's first and last init name ordered from first name to last name (e.g. C Abrams)
     * @prop {String} fullFMLName The player's full name in FML format (First name - Middle Name - Last Name)
     * @prop {String} fullLFMName The player's full name in LFM format (Last Name, - First Name - Middle Name)
     * @prop {Float} strikeZoneTop The top strike zone of the player
     * @prop {Float} strikeZoneBottom The bottom strike zone of the player
     */

    /** 
     * Object with info about the player's stats type
     * @typedef StatsType
     * @prop {String} displayName The display name of the stats type
     */

    /**
     * Object with info about a player's stats group
     * @typedef StatsGroup
     * @prop {('hitting'|'pitching'|'fielding')} displayName The display name of the stats group
     */

    /**
     * Object with info about a player's season hitting stats
     * @typedef SeasonHittingStats
     * @prop {Number} gamesPlayed The number of games the player has played (G)
     * @prop {Number} groundOuts The number of ground outs the player has had (GO)
     * @prop {Number} airOuts The number of air outs the player has had (AO)
     * @prop {Number} runs The number of runs the player has scored (R)
     * @prop {Number} doubles The number of doubles (2B) the player has scored
     * @prop {Number} triples The number of triples (TP) the player has scored
     * @prop {Number} homeRuns The number of home runs (HR) the player has scored
     * @prop {Number} strikeOuts The number of strike outs (SO) the player has had
     * @prop {Number} baseOnBalls The number of base on balls (BB) the player has had
     * @prop {Number} intentionalWalks The number of intentional walks (IBB) the player has had
     * @prop {Number} hits The number of hits the player has had
     * @prop {Number} hitByPitch The number of hit by pitches (HBP) the player has had
     * @prop {String} avg The batting average (AVG) of the player 
     * @prop {Number} atBats The number of at bats (AB) the player has had
     * @prop {String} obp The on base percentage (OBP) of the player
     * @prop {String} slg The slugging percentage (SLG) of the player
     * @prop {String} ops The on base plus slugging percentage (OPS) of the player
     * @prop {Number} caughtStealing The number of times the player has caught stealing (CS)
     * @prop {Number} stolenBases The number of times the player has stolen bases (SB)
     * @prop {String} stolenBasePercentage The percentage of times the player has stolen bases (SB%)
     * @prop {Number} groundIntoDoublePlay The number of times the player has been grounded into a double play (GIDP)
     * @prop {Number} numberOfPitches The number of pitches the player has thrown (NP)
     * @prop {Number} plateAppearances The number of plate appearances (PA) the player has had
     * @prop {Number} totalBases The total bases the player has had (TB)
     * @prop {Number} rbi The number of runs batted in (RBI) the player has had
     * @prop {Number} leftOnBase The number of times the player has left on base (LOB)
     * @prop {Number} sacBunts The number of times the player has sac bunts (SACB)
     * @prop {Number} sacFlies The number of times the player has sac flies (SACF)
     * @prop {String} bapib The number of times the player has been hit by pitch (BAPIP)
     * @prop {String} groundOutsToAirOuts The ground outs to air outs ratio (GO/AO) of the player
     * @prop {Number} catchersInterference The number of times the player has caught interference (CI)
     * @prop {String} atBatsPerHomeRun The number of at bats per home run (ABHR) of the player
     */

    /**
     * Player hitting stats split
     * @typedef PlayerSeasonHittingSplit
     * @prop {String} season The season of the split
     * @prop {SeasonHittingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     */

    /**
     * Object with info about a player's season pitching stats
     * @typedef SeasonPitchingStats
     * @prop {Number} gamesPlayed The number of games the player has played (G)
     * @prop {Number} groundOuts The number of ground outs the player has had (GO)
     * @prop {Number} airOuts The number of air outs the player has had (AO)
     * @prop {Number} runs The number of runs the player has scored (R)
     * @prop {Number} doubles The number of doubles (2B) the player has scored
     * @prop {Number} triples The number of triples (TP) the player has scored
     * @prop {Number} homeRuns The number of home runs (HR) the player has scored
     * @prop {Number} strikeOuts The number of strike outs (SO) the player has had
     * @prop {Number} baseOnBalls The number of base on balls (BB) the player has had
     * @prop {Number} intentionalWalks The number of intentional walks (IBB) the player has had
     * @prop {Number} hits The number of hits the player has had
     * @prop {Number} hitByPitch The number of hit by pitches (HBP) the player has had
     * @prop {String} avg The batting average (AVG) of the player 
     * @prop {Number} atBats The number of at bats (AB) the player has had
     * @prop {String} obp The on base percentage (OBP) of the player
     * @prop {String} slg The slugging percentage (SLG) of the player
     * @prop {String} ops The on base plus slugging percentage (OPS) of the player
     * @prop {Number} caughtStealing The number of times the player has caught stealing (CS)
     * @prop {Number} stolenBases The number of times the player has stolen bases (SB)
     * @prop {String} stolenBasePercentage The percentage of times the player has stolen bases (SB%)
     * @prop {Number} groundIntoDoublePlay The number of times the player has been grounded into a double play (GIDP)
     * @prop {Number} numberOfPitches The number of pitches the player has thrown (NP)
     * @prop {Number} plateAppearances The number of plate appearances (PA) the player has had
     * @prop {Number} totalBases The total bases the player has had (TB)
     * @prop {Number} rbi The number of runs batted in (RBI) the player has had
     * @prop {Number} leftOnBase The number of times the player has left on base (LOB)
     * @prop {Number} sacBunts The number of times the player has sac bunts (SACB)
     * @prop {Number} sacFlies The number of times the player has sac flies (SACF)
     * @prop {String} bapib The number of times the player has been hit by pitch (BAPIP)
     * @prop {String} groundOutsToAirOuts The ground outs to air outs ratio (GO/AO) of the player
     * @prop {Number} catchersInterference The number of times the player has caught interference (CI)
     * @prop {String} atBatsPerHomeRun The number of at bats per home run (ABHR) of the player
     */

    /**
     * Player pitching stats split
     * @typedef PlayerSeasonPitchingSplit
     * @prop {String} season The season of the split
     * @prop {SeasonPitchingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     */

    /**
     * Object with info about a player's season fielding stats
     * @typedef SeasonFieldingStats
     * @prop {Number} assists The number of assists (A) the player has had
     * @prop {Number} putOuts The number of put outs (PO) the player has had
     * @prop {Number} errors The number of errors (E) the player has had
     * @prop {Number} chances The number of chances (CH) the player has had
     * @prop {String} fielding The fielding percentage (FP) of the player
     * @prop {PrimaryPositionInfo} position The position of the player
     * @prop {String} rangeFactorPerGame The range factor per game (RF) of the player
     * @prop {String} rangeFactorPer9Inn The range factor per 9 innings (RF9) of the player
     * @prop {Number} games The number of games the player has played (G)
     * @prop {Number} gamesStarted The number of games the player has started (GS)
     * @prop {Number} doublePlays The number of double plays (DP) the player has had
     * @prop {Number} triplePlays The number of triple plays (TP) the player has had
     * @prop {Number} throwingErrors The number of throwing errors (TE) the player has had
     */

    /**
     * Player fielding stats split
     * @typedef PlayerSeasonFieldingSplit
     * @prop {String} season The season of the split
     * @prop {SeasonFieldingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     * @prop {PrimaryPositionInfo} position The position of the player in this stats split
     */

    /**
     * Object with info about a player's career hitting stats
     * @typedef CareerHittingStats
     * @prop {Number} gamesPlayed The number of games the player has played (G)
     * @prop {Number} groundOuts The number of ground outs the player has had (GO)
     * @prop {Number} airOuts The number of air outs the player has had (AO)
     * @prop {Number} runs The number of runs the player has scored (R)
     * @prop {Number} doubles The number of doubles (2B) the player has scored
     * @prop {Number} triples The number of triples (TP) the player has scored
     * @prop {Number} homeRuns The number of home runs (HR) the player has scored
     * @prop {Number} strikeOuts The number of strike outs (SO) the player has had
     * @prop {Number} baseOnBalls The number of base on balls (BB) the player has had
     * @prop {Number} intentionalWalks The number of intentional walks (IBB) the player has had
     * @prop {Number} hits The number of hits the player has had
     * @prop {Number} hitByPitch The number of hit by pitches (HBP) the player has had
     * @prop {String} avg The batting average (AVG) of the player 
     * @prop {Number} atBats The number of at bats (AB) the player has had
     * @prop {String} obp The on base percentage (OBP) of the player
     * @prop {String} slg The slugging percentage (SLG) of the player
     * @prop {String} ops The on base plus slugging percentage (OPS) of the player
     * @prop {Number} caughtStealing The number of times the player has caught stealing (CS)
     * @prop {Number} stolenBases The number of times the player has stolen bases (SB)
     * @prop {String} stolenBasePercentage The percentage of times the player has stolen bases (SB%)
     * @prop {Number} groundIntoDoublePlay The number of times the player has been grounded into a double play (GIDP)
     * @prop {Number} numberOfPitches The number of pitches the player has thrown (NP)
     * @prop {Number} plateAppearances The number of plate appearances (PA) the player has had
     * @prop {Number} totalBases The total bases the player has had (TB)
     * @prop {Number} rbi The number of runs batted in (RBI) the player has had
     * @prop {Number} leftOnBase The number of times the player has left on base (LOB)
     * @prop {Number} sacBunts The number of times the player has sac bunts (SACB)
     * @prop {Number} sacFlies The number of times the player has sac flies (SACF)
     * @prop {String} bapib The number of times the player has been hit by pitch (BAPIP)
     * @prop {String} groundOutsToAirOuts The ground outs to air outs ratio (GO/AO) of the player
     * @prop {Number} catchersInterference The number of times the player has caught interference (CI)
     * @prop {String} atBatsPerHomeRun The number of at bats per home run (ABHR) of the player
     */

    /**
     * Player hitting stats split
     * @typedef PlayerCareerHittingSplit
     * @prop {CareerHittingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     */

    /**
     * Object with info about a player's career pitching stats
     * @typedef CareerPitchingStats
     * @prop {Number} gamesPlayed The number of games the player has played (G)
     * @prop {Number} groundOuts The number of ground outs the player has had (GO)
     * @prop {Number} airOuts The number of air outs the player has had (AO)
     * @prop {Number} runs The number of runs the player has scored (R)
     * @prop {Number} doubles The number of doubles (2B) the player has scored
     * @prop {Number} triples The number of triples (TP) the player has scored
     * @prop {Number} homeRuns The number of home runs (HR) the player has scored
     * @prop {Number} strikeOuts The number of strike outs (SO) the player has had
     * @prop {Number} baseOnBalls The number of base on balls (BB) the player has had
     * @prop {Number} intentionalWalks The number of intentional walks (IBB) the player has had
     * @prop {Number} hits The number of hits the player has had
     * @prop {Number} hitByPitch The number of hit by pitches (HBP) the player has had
     * @prop {String} avg The batting average (AVG) of the player 
     * @prop {Number} atBats The number of at bats (AB) the player has had
     * @prop {String} obp The on base percentage (OBP) of the player
     * @prop {String} slg The slugging percentage (SLG) of the player
     * @prop {String} ops The on base plus slugging percentage (OPS) of the player
     * @prop {Number} caughtStealing The number of times the player has caught stealing (CS)
     * @prop {Number} stolenBases The number of times the player has stolen bases (SB)
     * @prop {String} stolenBasePercentage The percentage of times the player has stolen bases (SB%)
     * @prop {Number} groundIntoDoublePlay The number of times the player has been grounded into a double play (GIDP)
     * @prop {Number} numberOfPitches The number of pitches the player has thrown (NP)
     * @prop {Number} plateAppearances The number of plate appearances (PA) the player has had
     * @prop {Number} totalBases The total bases the player has had (TB)
     * @prop {Number} rbi The number of runs batted in (RBI) the player has had
     * @prop {Number} leftOnBase The number of times the player has left on base (LOB)
     * @prop {Number} sacBunts The number of times the player has sac bunts (SACB)
     * @prop {Number} sacFlies The number of times the player has sac flies (SACF)
     * @prop {String} bapib The number of times the player has been hit by pitch (BAPIP)
     * @prop {String} groundOutsToAirOuts The ground outs to air outs ratio (GO/AO) of the player
     * @prop {Number} catchersInterference The number of times the player has caught interference (CI)
     * @prop {String} atBatsPerHomeRun The number of at bats per home run (ABHR) of the player
     */

    /**
     * Object with info about a player's game hitting stats
     * @typedef GameHittingStats
     * @prop {Number} gamesPlayed The number of games the player has played (G)
     * @prop {Number} groundOuts The number of ground outs the player has had (GO)
     * @prop {Number} airOuts The number of air outs the player has had (AO)
     * @prop {Number} runs The number of runs the player has scored (R)
     * @prop {Number} doubles The number of doubles (2B) the player has scored
     * @prop {Number} triples The number of triples (TP) the player has scored
     * @prop {Number} homeRuns The number of home runs (HR) the player has scored
     * @prop {Number} strikeOuts The number of strike outs (SO) the player has had
     * @prop {Number} baseOnBalls The number of base on balls (BB) the player has had
     * @prop {Number} intentionalWalks The number of intentional walks (IBB) the player has had
     * @prop {Number} hits The number of hits the player has had
     * @prop {Number} hitByPitch The number of hit by pitches (HBP) the player has had
     * @prop {String} avg The batting average (AVG) of the player 
     * @prop {Number} atBats The number of at bats (AB) the player has had
     * @prop {String} obp The on base percentage (OBP) of the player
     * @prop {String} slg The slugging percentage (SLG) of the player
     * @prop {String} ops The on base plus slugging percentage (OPS) of the player
     * @prop {Number} caughtStealing The number of times the player has caught stealing (CS)
     * @prop {Number} stolenBases The number of times the player has stolen bases (SB)
     * @prop {String} stolenBasePercentage The percentage of times the player has stolen bases (SB%)
     * @prop {Number} groundIntoDoublePlay The number of times the player has been grounded into a double play (GIDP)
     * @prop {Number} numberOfPitches The number of pitches the player has thrown (NP)
     * @prop {Number} plateAppearances The number of plate appearances (PA) the player has had
     * @prop {Number} totalBases The total bases the player has had (TB)
     * @prop {Number} rbi The number of runs batted in (RBI) the player has had
     * @prop {Number} leftOnBase The number of times the player has left on base (LOB)
     * @prop {Number} sacBunts The number of times the player has sac bunts (SACB)
     * @prop {Number} sacFlies The number of times the player has sac flies (SACF)
     * @prop {String} bapib The number of times the player has been hit by pitch (BAPIP)
     * @prop {String} groundOutsToAirOuts The ground outs to air outs ratio (GO/AO) of the player
     * @prop {Number} catchersInterference The number of times the player has caught interference (CI)
     * @prop {String} atBatsPerHomeRun The number of at bats per home run (ABHR) of the player
     */

    /**
     * Player hitting stats split
     * @typedef PlayerGameHittingSplit
     * @prop {GameHittingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     */

    /**
     * Object with info about a player's game pitching stats
     * @typedef GamePitchingStats
     * @prop {Number} gamesPlayed The number of games the player has played (G)
     * @prop {Number} groundOuts The number of ground outs the player has had (GO)
     * @prop {Number} airOuts The number of air outs the player has had (AO)
     * @prop {Number} runs The number of runs the player has scored (R)
     * @prop {Number} doubles The number of doubles (2B) the player has scored
     * @prop {Number} triples The number of triples (TP) the player has scored
     * @prop {Number} homeRuns The number of home runs (HR) the player has scored
     * @prop {Number} strikeOuts The number of strike outs (SO) the player has had
     * @prop {Number} baseOnBalls The number of base on balls (BB) the player has had
     * @prop {Number} intentionalWalks The number of intentional walks (IBB) the player has had
     * @prop {Number} hits The number of hits the player has had
     * @prop {Number} hitByPitch The number of hit by pitches (HBP) the player has had
     * @prop {String} avg The batting average (AVG) of the player 
     * @prop {Number} atBats The number of at bats (AB) the player has had
     * @prop {String} obp The on base percentage (OBP) of the player
     * @prop {String} slg The slugging percentage (SLG) of the player
     * @prop {String} ops The on base plus slugging percentage (OPS) of the player
     * @prop {Number} caughtStealing The number of times the player has caught stealing (CS)
     * @prop {Number} stolenBases The number of times the player has stolen bases (SB)
     * @prop {String} stolenBasePercentage The percentage of times the player has stolen bases (SB%)
     * @prop {Number} groundIntoDoublePlay The number of times the player has been grounded into a double play (GIDP)
     * @prop {Number} numberOfPitches The number of pitches the player has thrown (NP)
     * @prop {Number} plateAppearances The number of plate appearances (PA) the player has had
     * @prop {Number} totalBases The total bases the player has had (TB)
     * @prop {Number} rbi The number of runs batted in (RBI) the player has had
     * @prop {Number} leftOnBase The number of times the player has left on base (LOB)
     * @prop {Number} sacBunts The number of times the player has sac bunts (SACB)
     * @prop {Number} sacFlies The number of times the player has sac flies (SACF)
     * @prop {String} bapib The number of times the player has been hit by pitch (BAPIP)
     * @prop {String} groundOutsToAirOuts The ground outs to air outs ratio (GO/AO) of the player
     * @prop {Number} catchersInterference The number of times the player has caught interference (CI)
     * @prop {String} atBatsPerHomeRun The number of at bats per home run (ABHR) of the player
     */

    /**
     * Player pitching stats split
     * @typedef PlayerGamePitchingSplit
     * @prop {GamePitchingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     */

    /**
     * Object with info about a player's game fielding stats
     * @typedef GameFieldingStats
     * @prop {Number} assists The number of assists (A) the player has had
     * @prop {Number} putOuts The number of put outs (PO) the player has had
     * @prop {Number} errors The number of errors (E) the player has had
     * @prop {Number} chances The number of chances (CH) the player has had
     * @prop {String} fielding The fielding percentage (FP) of the player
     * @prop {PrimaryPositionInfo} position The position of the player
     * @prop {String} rangeFactorPerGame The range factor per game (RF) of the player
     * @prop {String} rangeFactorPer9Inn The range factor per 9 innings (RF9) of the player
     * @prop {Number} games The number of games the player has played (G)
     * @prop {Number} gamesStarted The number of games the player has started (GS)
     * @prop {Number} doublePlays The number of double plays (DP) the player has had
     * @prop {Number} triplePlays The number of triple plays (TP) the player has had
     * @prop {Number} throwingErrors The number of throwing errors (TE) the player has had
     */

    /**
     * Player fielding stats split
     * @typedef PlayerGameFieldingSplit
     * @prop {GameFieldingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     * @prop {PrimaryPositionInfo} position The position of the player in this stats split
     */

    /**
     * Player pitching stats split
     * @typedef PlayerCareerPitchingSplit
     * @prop {CareerPitchingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     */

    /**
     * Object with info about a player's career stats
     * @typedef CareerFieldingStats
     * @prop {Number} assists The number of assists (A) the player has had
     * @prop {Number} putOuts The number of put outs (PO) the player has had
     * @prop {Number} errors The number of errors (E) the player has had
     * @prop {Number} chances The number of chances (CH) the player has had
     * @prop {String} fielding The fielding percentage (FP) of the player
     * @prop {PrimaryPositionInfo} position The position of the player
     * @prop {String} rangeFactorPerGame The range factor per game (RF) of the player
     * @prop {String} rangeFactorPer9Inn The range factor per 9 innings (RF9) of the player
     * @prop {Number} games The number of games the player has played (G)
     * @prop {Number} gamesStarted The number of games the player has started (GS)
     * @prop {Number} doublePlays The number of double plays (DP) the player has had
     * @prop {Number} triplePlays The number of triple plays (TP) the player has had
     * @prop {Number} throwingErrors The number of throwing errors (TE) the player has had
     */

    /**
     * Player fielding stats split
     * @typedef PlayerCareerFieldingSplit
     * @prop {CareerFieldingStats} stat The stats of the split
     * @prop {ShortTeamInfo} team The team the player is on
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortLeagueInfo} league The league the player is on
     * @prop {ShortSportInfo} sport The sport the player is on
     * @prop {('R'|'S'|'E'|'A'|'D'|'F'|'L'|'W')} gameType The game type of the stats
     * @prop {PrimaryPositionInfo} position The position of the player in this stats split
     */

    /**
     * Object with info about a player's season stats
     * @typedef PlayerSeasonStats
     * @prop {StatsType} type The type of the stats
     * @prop {StatsGroup} group The group of the stats
     * @prop {Array} exemptions The exemptions of the stats
     * @prop {(PlayerSeasonPitchingSplit[]|PlayerSeasonHittingSplit[]|PlayerSeasonFieldingSplit[])} splits The player's splits of the requested season
     */

    /**
     * Object with info about a player's career stats
     * @typedef PlayerCareerStats
     * @prop {StatsType} type The type of the stats
     * @prop {StatsGroup} group The group of the stats
     * @prop {Number} [totalSplits] The total number of splits
     * @prop {Array} exemptions The exemptions of the stats
     * @prop {(PlayerCareerPitchingSplit[]|PlayerCareerHittingSplit[]|PlayerCareerFieldingSplit[])} splits The player's splits of the career stats
     */

    /**
     * Object with info about a player's game stats
     * @typedef PlayerGameStats
     * @prop {StatsType} type The type of the stats
     * @prop {StatsGroup} group The group of the stats
     * @prop {Array} exemptions The exemptions of the stats
     * @prop {PlayerGameStats[]} splits The player's splits of the career stats
     */

    /**
     * Object with info about a a free agent
     * @typedef FreeAgent
     * @prop {ShortPlayerInfo} player The player's infomation
     * @prop {ShortTeamInfo} originalTeam The team the player was originally on
     * @prop {String} [notes] The notes about the player's free agent status
     * @prop {String} [dateSigned] The date the player has signed
     * @prop {String} dateDeclared The date the player was declared as free agent
     * @prop {PrimaryPositionInfo} position The position of the player
     */

    /**
     * Search a player by a keyword
     * @param {String} keyword The keyword of the player to search
     * @returns {PlayerInfo[]} An array with the info of the player(s) matching the keyword 
     * @throws {TypeError} If the keyword is not a string
     */
    async search(keyword) {
        if (typeof keyword !== 'string') throw new TypeError('KEYWORD_NOT_STRING', 'The keyword must be a string');
        const r = await this.request(`${this.base}/${this.version}/sports/1/players`);

        let players = [];
        for (let p in r.data.people) {
            for (let v in Object.values(r.data.people[p])) {
                if (Object.values(r.data.people[p])[v].toString().toLowerCase().includes(keyword.toLowerCase())) {
                    players.push(r.data.people[p]);
                    break;
                }
            }
        }

        return players;
    }

    /**
     * Get the info of a player
     * @param {Number} id The id of the player to get
     * @returns {PlayerInfo} The info of the player with corresponding id
     * @throws {TypeError} If the id is not a number
     * @throws {Error} If the player with the id doesn't exist
     */
    async get(id) {
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        const r = await this.request(`${this.base}/${this.version}/people/${id}`)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        return r.data.people[0];
    }

    /**
     * Get the stats of a player in the given season
     * @param {Number} id The id of the player to get the season stats of
     * @param {('hitting'|'pitching'|'fielding')} type What type of stats to get
     * @param {String} [season=2022] The season year to get the stats of
     * @returns {PlayerSeasonStats[]} Array with the stats of the player with corresponding id in the given season
     * @throws {TypeError} If the id is not a number
     * @throws {TypeError} If the type is not a string
     * @throws {Error} If no type is given or if the type is not one of the three types
     * @throws {Error} If the player with the id doesn't exist
     * @throws {Error} If the season year is not a string
     * @throws {Error} If the season year is not a valid year
     */
    async getSeasonStats(id, type, season = '2022') {
        if (!type) throw new Error('NO_TYPE_GIVEN', 'No type given');
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        if (typeof type !== 'string') throw new TypeError('TYPE_NOT_STRING', 'The type must be a string');
        if (type !== 'hitting' && type !== 'pitching' && type !== 'fielding') throw new TypeError('INVALID_TYPE', 'The type must be either hitting, pitching or fielding');
        if (typeof season !== 'string') throw new TypeError('SEASON_NOT_STRING', 'The season must be a string');
        if (!season.match(/^\d{4}$/)) throw new Error('INVALID_SEASON', 'The season must be a valid year');

        const r = await this.request(`${this.base}/${this.version}/people/${id}?hydrate=stats(group=[${type}],type=[season],${season ? `season=${season}` : ''})`)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        if (!r.data.people[0].stats) throw new Error('STATS_NOT_FOUND', `The player has no ${type} stats in the season ${season}`);

        return r.data.people[0].stats;
    }

    /**
     * Get the career stats of a player in the given season
     * @param {Number} id The id of the player to get the career stats of
     * @param {('hitting'|'pitching'|'fielding')} type What type of stats to get
     * @returns {PlayerCareerStats[]} Array with the career stats of the player with corresponding id
     * @throws {TypeError} If the id is not a number
     * @throws {TypeError} If the type is not a string
     * @throws {Error} If no type is given or if the type is not one of the three types
     * @throws {Error} If the player with the id doesn't exist
     */
    async getCareerStats(id, type) {
        if (!type) throw new Error('NO_TYPE_GIVEN', 'No type given');
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        if (typeof type !== 'string') throw new TypeError('TYPE_NOT_STRING', 'The type must be a string');
        if (type !== 'hitting' && type !== 'pitching' && type !== 'fielding') throw new TypeError('INVALID_TYPE', 'The type must be either hitting, pitching or fielding');

        const r = await this.request(`${this.base}/${this.version}/people/${id}?hydrate=stats(group=[${type}],type=[career])`)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        if (!r.data.people[0].stats) throw new Error('STATS_NOT_FOUND', `The player has no ${type} career stats`);

        return r.data.people[0].stats;
    }

    /**
     * Get the game stats of a player of the given game
     * @param {Number} id The id of the player to get the game stats of
     * @param {Number} gamePk The pk of the game to get the stats of
     * @returns {PlayerGameStats[]} The game stats of the player with corresponding id in the given game
     * @throws {TypeError} If the id is not a number
     * @throws {TypeError} If the gamePk is not a number
     * @throws {Error} If the player with the id doesn't exist
     * @throws {Error} If the game with the gamePk doesn't exist
     * @throws {Error} If the player has no game stats in the game with the gamePk
     */
    async getGameStats(id, gamePk) {
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        if (typeof gamePk !== 'number') throw new TypeError('GAME_PK_NOT_NUMBER', 'The gamePk must be a number');

        const p = await this.get(id)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        const r = await this.request(`${this.base}/${this.version}/people/${id}/stats/game/${gamePk}`);

        if (r.data.stats.length === 0) throw new Error('STATS_NOT_FOUND', `The player has no game stats in the game with the gamePk ${gamePk}`);
        
        let i = 0;
        r.data.stats.forEach(s => {
            if (s.splits?.length > 0) i++;
        });

        if (i === 0) throw new Error('STATS_NOT_FOUND', `The player with the id ${id} has no game stats in the game with the gamePk ${gamePk}`);

        return r.data.stats;
    }

    /**
     * Get the free agents of the given season
     * @param {String} [season='2022'] The season year to get the free agents of
     * @returns {FreeAgent[]} Array with the info of the free agents in the given season
     * @throws {TypeError} If the season year is not a string
     * @throws {Error} If the season year is not a valid year
     */
    async getFreeAgents(season = '2022') {
        if (typeof season !== 'string') throw new TypeError('SEASON_NOT_STRING', 'The season must be a string');
        if (!season.match(/^\d{4}$/)) throw new Error('INVALID_SEASON', 'The season must be a valid year');

        const r = await this.request(`${this.base}/${this.version}/people/freeAgents?season=${season}`)
            .catch(err => {
                throw new Error('FREE_AGENTS_NOT_FOUND', `Cannot find the free agents in the season ${season}`);
            });

        return r.data.freeAgents;
    }

    /**
     * Get changed players updated since the given date
     * @param {Date} updatedSince The date to get the changed players updated since
     * @returns {PlayerInfo[]} Array with the info of the changed players
     * @throws {TypeError} If the date is not a Date
     * @throws {Error} If the date is not given
     * @throws {Error} If the date is not a valid date
     * @throws {Error} If the date is in the future
     * @throws {Error} If there aren't any changed players found since the given date
     */
    async getChanges(updatedSince) {
        if (!updatedSince) throw new Error('NO_DATE_GIVEN', 'No date given');
        if (typeof updatedSince !== 'object' || !(updatedSince instanceof Date)) throw new TypeError('DATE_NOT_DATE', 'The date must be a Date');
        if (updatedSince.getTime() > Date.now()) throw new Error('DATE_IN_FUTURE', 'The date must be in the past');

        const r = await this.request(`${this.base}/${this.version}/people/changes?updatedSince=${updatedSince.toISOString()}`)
            .catch(err => {
                throw new Error('CHANGES_NOT_FOUND', `Cannot find the changed players updated since ${updatedSince.toISOString()}`);
            });

        return r.data.people;
    }
}

module.exports = { PlayerManager };