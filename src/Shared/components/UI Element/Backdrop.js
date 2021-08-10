import ReactDom from 'react-dom'
import classes from './Backdrop.module.css'

const BackDrop=(props)=>{

    return ReactDom.createPortal(<div className={classes.backdrop} onClick={props.onClose}></div>,document.getElementById('backDrop'))
}


export default BackDrop