
function test(data) {
    return (
        <div className="items" style="display: none;">
            <ul className="ul">{data.map(item => <li>{item.name}</li>)}</ul>
        </div>
    )
}
export { test }