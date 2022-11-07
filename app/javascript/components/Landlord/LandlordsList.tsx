import * as React from "react";
import {LandlordInterface, LandlordsInterface} from "./useLandlord";

export default function LandlordsList({landlords}: { landlords: LandlordInterface[] }) {
    return (
        <div>
            <h1>Landlords List Component</h1>
            <ul>
                {landlords.map((landlord: LandlordInterface) => (
                    <li key={landlord.id}>
                        {landlord.id} - {landlord.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

