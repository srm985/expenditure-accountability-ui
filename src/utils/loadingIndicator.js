import LoadingIndicator from '../components/LoadingIndicatorComponent';

let pendingSpinnerCount = 0;

const loadingIndicator = {
    hide: () => {
        const {
            displayName
        } = LoadingIndicator;

        const loadingIndicatorElement = document.getElementsByClassName(displayName)[0];

        if (pendingSpinnerCount <= 1) {
            loadingIndicatorElement.classList.remove(`${displayName}--visible`);
        }

        pendingSpinnerCount -= 1;
    },

    show: () => {
        const {
            displayName
        } = LoadingIndicator;

        const loadingIndicatorElement = document.getElementsByClassName(displayName)[0];

        if (pendingSpinnerCount === 0) {
            loadingIndicatorElement.classList.add(`${displayName}--visible`);
        }

        pendingSpinnerCount += 1;
    }
};

export default loadingIndicator;
