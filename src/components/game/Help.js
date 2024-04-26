import React, { useState } from 'react';

function Help() {
    const [showHelp, setShowHelp] = useState(false);

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    return (
        <div>
            <button onClick={toggleHelp}>Help</button>
            {showHelp && (
                <div className="help-window">
                    <h2>Game Instructions</h2>
                    <p>
                        Destroy all the bricks by clicking them in groups of the same color.
                        The more you get at once, the higher the score. If you try to remove
                        a single brick you will lose a life!
                    </p>
                    <ul>
                        <li>🟥 1 point</li>
                        <li>🟩 8 points</li>
                        <li>🟦 32 points</li>
                        <li>🟨 128 points</li>
                        <li>🟪 512 points</li>
                        <li>🟧 2048 points</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Help;
