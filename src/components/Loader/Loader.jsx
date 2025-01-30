import "./style.scss";

export default function Loader({isLarge = false, isSmall = true, isOnly = false }) {
    return (
      <div className={`${isOnly ? '' : 'loader-container'} `}>
        <div className={`loader-animation ${isLarge ? 'loader-animation-lg' : ''} ${isSmall ? 'loader-animation-sm' : ''}`} />
      </div>
    )
}