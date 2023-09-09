import './input.scss';

interface Props {
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    label: string;
    value?: string;
    placeholder: string;
    onChange: (text: string) => void;
}
export function AppInput(props: Props) {
    return (
        <div className="form-floating mb-3">
            <input 
                type={props.type || "text"}
                className="form-control"
                id="floatingInput"
                placeholder={props.placeholder}
            />
                <label >{props.label}</label>
        </div>
    )
}