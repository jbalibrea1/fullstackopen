import { FullDir, Dir } from './Dir'

// const Country = ({ country }) => {
//   if (country.length >= 10) {
//     return <p>Too many matches, scpecify another filter </p>
//   } else if (
//     (country.length < 10 && country.length > 1) ||
//     country.length === 0
//   ) {
//     return (
//       <div>
//         {country.map(name => (
//           <p key={name.name}> {name.name}</p>
//         ))}
//       </div>
//     )
//   } else {
//     return <Dir country={country} />
//   }
// }

const Country = ({ country, handleSwitchCountry }) => {
  if (country.length >= 10) {
    return <p>Too many matches, scpecify another filter </p>
  } else if (
    (country.length < 10 && country.length > 1) ||
    country.length === 0
  ) {
    return (
      <div>
        {country.map(name => (
          <Dir
            key={name.name}
            country={name.name}
            handleSwitchCountry={handleSwitchCountry}
          />
        ))}
      </div>
    )
  } else {
    return <FullDir country={country} />
  }
}

export default Country
