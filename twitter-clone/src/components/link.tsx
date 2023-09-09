import './link.scss';

interface Props {
    link: string;
    text: string;
}
export function AppLink(props: Props) {
    return (
        <p className='link' onClick={() => window.open(props.link)}>
            {props.text}
        </p>
    )
}