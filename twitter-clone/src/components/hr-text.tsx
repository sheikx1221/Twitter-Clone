import './hr-text.scss';

export function AppTextHR() {
    return (
        <div className="hr-text d-flex column align-items-center justify-content-center">
            <div style={{ width: "100%", height: 1, backgroundColor: '#EFF3F4', borderImageWidth: 1 }} className="mx-2"></div>
            <div >or</div>
            <div style={{ width: "100%", height: 1, backgroundColor: '#EFF3F4', borderImageWidth: 1 }} className="mx-2"></div>
        </div>
    )
}