export default function FilterButton() {
    return (
        <button
            className={"text-white"}
            onClick={() => setFilter(name)}
        >
            {name}
        </button>
    )
};