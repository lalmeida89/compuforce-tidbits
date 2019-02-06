/*
Javascript / React.JS

This snippet is from my Fantasy Football mock draft app, or Build-a-champion Workshop as
I have for some reason decided to name it that. I'm proud of this bit because I felt as If I was
reaching the next level as a programmer; I started using more .map() and .forEach() instead
of constantly using for loops. This bit is the final page of the app, which shows every player on every
team in the draft. The teams array is a multi dimensional array that contains each team (minimum of 4
and a maximum of 30) and then each one of those contains a number of players (minimum of 1, maximum of 200).
The first function, mappedTeam(), maps through each individual team returning the players. The ShowAllTeams()
function then maps and returns the teams themselves, with that team being passed into the first function
and returning all the players on every team. We then export ShowAllTeams and wrap it up in a pretty little
React component.
*/

const mappedTeam = currentTeam => {
  let thisTeam = currentTeam.map((player, i) => (
    <div key={i}>
      {player.name ?
        player.name
        : player.firstName + player.lastName}
      {' '} {player.round}.{player.pickedAt}
    </div>
  ))
  return <div className='mappedTeam-div'> {thisTeam} </div>
}

const ShowAllTeams = props => {
  let showPlayers = props.finalPage, teams = props.teams,
    draftPosition = props.draftPos, userIcon = <i className="fas fa-user"></i>
  let teamNames = teams.map((team, index) => (
    <div key={index} className='teamResults'>
      <h3> Team {index+1}
        { index === draftPosition-1
        ? userIcon
        : null }
      </h3>
      {mappedTeam(team)}
    </div>
  ))
  return (
    <Transition in={showPlayers} timeout={duration}>
    {(state) => (
    <div className='teamResults-div' style={{
      ...playerNamesStyle,
      ...playerNamesTransitionStyles[state]}}>
      {teamNames}
    </div>
  )}
  </Transition>
  )
}

export default ShowAllTeams
