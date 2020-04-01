import React from 'react';

export const ErrorDisplay = ({formErrors = []}) => (
    <div>
    {
        formErrors.map((error, i) => (
            <div className="error" key={i}>
                {error.description}
            </div>
        ))
    }
    </div>
)
    