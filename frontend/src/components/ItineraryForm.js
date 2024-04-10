import React from 'react';

const ItineraryForm = () => {

    return (
        <div>
            <h2>Itinerary Form</h2>
            <form>
                <table>
                    <thead>
                    <tr>
                        <th>Itinerary Stops</th>
                        <th>Location Address</th>
                        <th>Travel Time</th>
                        <th>Stop Over Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Pick up Location</td>
                        <td>
                            <input type="text" name="field1" disabled="true"/>
                        </td>
                        <td>
                            <input type="text" name="field2" value="–" disabled="true"/>
                        </td>
                        <td>
                            <input type="text" name="field3" disabled="true"/>
                        </td>
                    </tr>
                    {/*//TODO These need to be dynamic*/}
                    <tr>
                        <td>Added Location Name</td>
                        <td>
                            <input type="text" name="field5" disabled="true"/>
                        </td>
                        <td>
                            <input type="text" name="field6" disabled="true"/>
                        </td>
                        <td>
                            <input type="text" name="field7"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Drop off Location</td>
                        <td>
                            <input type="text" name="field9" disabled="true"/>
                        </td>
                        <td>
                            <input type="text" name="field10" disabled="true"/>
                        </td>
                        <td>
                            <input type="text" name="field11" value="–" disabled="true"/>
                        </td>
                    </tr>
                    {/* Add more rows as needed */}
                    </tbody>
                </table>
            </form>
            {/*<button type="submit">Save</button>*/}
            {/*<button type="button" onClick={handleCancel}>Cancel</button>*/}
        </div>
    );
};

export default ItineraryForm;