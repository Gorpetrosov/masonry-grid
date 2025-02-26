import { ImSpinner8 } from 'react-icons/im';
import "./LoadingSpinner.css"

interface LoadingSpinnerProps {
    isLoading: boolean;
    size?: number;
    color?: string;
}

export const LoadingSpinner = ({
                                   size = 40,
                                   color = '#ed2b2b',
                                   isLoading
                               }: LoadingSpinnerProps) => {
    return (
        <div className={`spinner-container ${isLoading ? 'spinner-flex' : ''}`}>
                <ImSpinner8
                    className="spinner-icon"
                    style={{ fontSize: size, color }}
                />
        </div>
    );
};