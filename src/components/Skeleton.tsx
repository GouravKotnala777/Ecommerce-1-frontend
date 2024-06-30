import "../styles/components/skeleton.scss";

interface SkeletonPropTypes {
    width?:string;
    height?:string;
    margin?:string;
}

const Skeleton = ({width, height, margin}:SkeletonPropTypes) => {

    return(
        <div className="skeleton_bg" style={{width:width?width:"100%", height:height?height:"15px", margin:margin?margin:"0"}}>
            
        </div>
    )
}

export default Skeleton;