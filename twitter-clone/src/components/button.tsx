import './button.scss';

interface Props {
    icon?: string;
    title: string;
    onClick?: () => void;
    taste?: "normal" | "primary" | "dark" | "disabled"
}
export function AppButton({ taste = "normal", ...props }: Props) {
    return (
        <>
            {taste == "normal" && (
                <div
                    onClick={props.onClick}
                    role={props.onClick ? "button": "none"}
                    style={{ border: '1px solid rgb(207, 217, 222)', fontFamily: 'TwitterChirp', fontWeight: 'bold' }}
                    className="d-flex rounded-pill p-2 px-4 justify-content-center align-items-center w-100"
                >
                    {props.icon && <img src={props.icon} style={{ width: '1rem', height: '1rem', marginRight: '1rem' }} />}
                    <p className="m-0">
                        {props.title}
                    </p>
                </div>
            )}
            {taste == "primary" && (
                <div
                    onClick={props.onClick}
                    role={"button"}
                    style={{ border: '1px solid rgb(207, 217, 222)', fontFamily: 'TwitterChirp', fontWeight: 'bolder', color: 'white' }}
                    className="d-flex rounded-pill p-2 px-5 justify-content-center align-items-center w-100 bg-primary"
                >
                    {props.icon && <img src={props.icon} style={{ width: '1rem', height: '1rem', marginRight: '1rem' }} />}
                    <p className="m-0">
                        {props.title}
                    </p>
                </div>
            )}
            {taste === "dark" && (
                <div
                    onClick={props.onClick}
                    role={"button"}
                    style={{ border: '1px solid rgb(207, 217, 222)', fontFamily: 'TwitterChirp', fontWeight: 'bolder', color: 'white' }}
                    className="d-flex rounded-pill p-2 px-5 justify-content-center align-items-center w-100 bg-dark"
                >
                    {props.icon && <img src={props.icon} style={{ width: '1rem', height: '1rem', marginRight: '1rem' }} />}
                    <p className="m-0">
                        {props.title}
                    </p>
                </div>
            )}
            {taste === "disabled" && (
                <div
                    style={{ border: '1px solid rgb(207, 217, 222)', fontFamily: 'TwitterChirp', fontWeight: 'bolder', color: 'white' }}
                    className="d-flex rounded-pill p-2 px-5 justify-content-center align-items-center w-100 bg-secondary"
                >
                    {props.icon && <img src={props.icon} style={{ width: '1rem', height: '1rem', marginRight: '1rem' }} />}
                    <p className="m-0">
                        {props.title}
                    </p>
                </div>
            )}
        </>
    )
}