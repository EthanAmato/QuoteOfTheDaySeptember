import { useState, useEffect } from "react";

// This is a custom hook that will
// 1. Create a piece of state that will correspond with
//    a quote we're receiving from an API
// 2. It will call a callback upon first render of whatever
//    component uses it (via a useEffect)
// 3. It will (eventually) cache a quote and the current day
//    and run some logic to see if the day has changed since the
//    last quote was received and, if so, it will recall the API
//    for a new 'quote of the day'

export default function useGetQuote() {
  const [currentQuote, setCurrentQuote] = useState();

  // useEffect will help us call a callback upon changes to a value
  // and also synchronize our component to events outside of the component (apis, other DOM nodes, etc.)

  // The callback in the first input arg will be called upon first render or whenever react
  // senses a change in a value/state inside of our dependency array
  useEffect(() => {
    // Split on the ISOSTring (which is in YYYY-MM-DDTHH-MM-SSZ format)
    // Which will give us an array where the first item (index 0) is the current date
    const currentDate = new Date().toISOString().split("T")[0];
    // console.log(currentDate);

    const lastQuoteDate = window.localStorage.getItem("lastQuoteDate");

    // If currenDate that we just checked is NOT equal to the value of the last
    // quote date we stored in our cache (meaning it was yesterday or before that),
    // We will call our API, update our state, and set the new lastQuoteDate in our cache
    // to today's date in addition to the quote of the day
    if (currentDate !== lastQuoteDate) {
      fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCurrentQuote(data[0]);

          window.localStorage.setItem("lastQuoteDate", currentDate);

          // Can use the JSON class to turn our quote data into a string that can be stored
          // in our cache using the stringify method
          window.localStorage.setItem("currentQuote", JSON.stringify(data[0]));
        })
        .catch((error) => {
          console.log("Error fetching quote:", error);
        });
    } else {
      // If the quote has already been fetched for the day (meaning that currentDate === lastQuoteDate),
      // we can just reuse the currentQuote data from localStorage that we stored

      // JSON.parse() will take in a string that is in JSON format and convert it into a
      // JS object
      const cachedQuote = JSON.parse(
        window.localStorage.getItem("currentQuote")
      );

      if (cachedQuote) {
        setCurrentQuote(cachedQuote);
      }
    }
  }, []);

  return currentQuote;
}
