import './input.scss';

interface Props {
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    label: string;
    value?: string;
    placeholder: string;
    onChange: (text: string) => void;
    onFocus?: () => void;
    autoFocus?: boolean;
    static?: boolean;
}
export function AppInput(props: Props) {
    return (
        <div className="form-floating mb-3">
            <input
                autoFocus={props.autoFocus}
                type={props.type || "text"}
                className={`form-control`}
                id="floatingInput"
                placeholder={props.placeholder}
                onChange={(e) => props.static ? undefined: props.onChange(e.target.value)}
                onFocus={() => {
                    if (props.static) props.onFocus ? props.onFocus(): undefined
                }}
                value={props.value}
            />
                <label >{props.label}</label>
        </div>
    )
}