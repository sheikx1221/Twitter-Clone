import './link.scss';

interface Props {
    link: string;
    text: string;
    onClick?: () => void;
}
export function AppLink(props: Props) {
    return (
        <p className='link' onClick={() => {
            if (props.link) window.open(props.link)
            else {
                if (props.onClick) props.onClick();
            }
        }}>
            {props.text}
        </p>
    )
}