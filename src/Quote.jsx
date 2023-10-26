

export default function Quote({quoteData}) {

    return(
        <>
            <h1>{quoteData.quote}</h1>
            <h2>Spoken by {quoteData.author}</h2>
            <p>On the subject of {quoteData.category}</p>
        </>
    )

}