import { useState } from "react";
import CountriesPreview from "../components/CountriesPreview/CountriesPreview";
import FavoriteButton from "../components/FavoriteButton/FavoriteButton";
import Form from "../components/Form";
import Header from "../components/Header/Header";
import StyledButton from "../components/StyledButton";
import StyledList from "../components/StyledList";
import StyledListElement from "../components/StyledListElement";

export default function FavoriteCountriesPage({
  countries,
  countriesInfo,
  onToggleFavorite,
}) {
  const [selectedCountry, setSelectedCountry] = useState("");

  const listFavoriteCountries = countriesInfo.filter((info) => info.isFavorite);

  const favoriteCountries = countries.filter((country) =>
    listFavoriteCountries.find((info) => info.name === country.name.common)
  );

  return (
    <>
      <Header headline="to explore" />
      <StyledList isOnCard>
        {favoriteCountries.map((country) => {
          const isCountrySelected = selectedCountry === country.name.common;
          return (
            <>
              <StyledListElement key={country.name}>
                <CountriesPreview
                  name={country.name.common}
                  capital={country.capital}
                  continent={country.region}
                  flag={country.flag}
                  countries={favoriteCountries}
                  onToggleFavorite={onToggleFavorite}
                  countriesInfo={countriesInfo}
                />
                <StyledButton positionSVG>
                  <FavoriteButton
                    onToggleFavorite={onToggleFavorite}
                    countriesInfo={countriesInfo}
                    name={country.name.common}
                  />
                </StyledButton>
                {isCountrySelected && <Form />}
              </StyledListElement>
              <button
                onClick={() =>
                  setSelectedCountry(!isCountrySelected && country.name.common)
                }
              >
                {isCountrySelected ? "Hide form" : "Add details"}
              </button>
            </>
          );
        })}
      </StyledList>
    </>
  );
}
