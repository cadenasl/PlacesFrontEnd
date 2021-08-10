import classes from './Avatar.module.css'

const Avatar = props=>{

    const imageClass=[`${classes.avatar} ${props.className?props.className:null}`].join(' ')
    return(
        <div className={imageClass} style={props.style}>
            <img 
                src={props.image}
                alt={props.alt}
                style={{width:props.width, height:props.width}}
            />
        </div>
    )
}


export default Avatar