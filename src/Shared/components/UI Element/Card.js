import classes from './Card.module.css'


const Card =(props)=>{

    const cardCss=[`${classes.card} ${props.className?props.className:null}`].join(' ')
    return(
        <div className={cardCss} style={props.style}>
        {props.children}
        </div>
    )
}


export default Card