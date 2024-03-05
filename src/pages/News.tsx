import ISimplified from "../types/ISimplified"

const News = ({ simplified }: ISimplified) => {
    return (
        <>
            {simplified && <h1>Hello</h1>}
            <div>News</div>
        </>
    )
}

export default News