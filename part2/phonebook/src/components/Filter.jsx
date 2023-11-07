const Filter =(props) =>{
return <div>
Search by: <input value={props.newFilter} onClick={props.clearDefaultHandler} onChange={props.filterChangeHandler} />
</div>
}

export default Filter