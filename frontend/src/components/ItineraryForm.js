import React from 'react';

const ItineraryForm = ({totalTravelTime, handleStartDateChange, handleEndDateChange, selectedStartDate, selectedEndDate}) => {

    return (
        <div>
            <h2>Itinerary Form</h2>
            <form>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Start Date Time
                        </th>
                        <th>
                            End Date Time
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <label>
                                <input type="datetime-local" name="startDateTime" value={selectedStartDate}
                                       onChange={handleStartDateChange} disabled={false}/>
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="datetime-local" name="endDateTime" value={selectedEndDate}
                                       onChange={handleEndDateChange}
                                       disabled={true}/>
                            </label>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <th>Itinerary Stops</th>
                        <th>Location Address</th>
                        <th>Travel Time</th>
                        <th>Stop Over Time (Min)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Pick up Location</td>
                        <td>
                            <input type="text" name="field1" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="field2" value="–" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="field3" value="–" disabled={true}/>
                        </td>
                    </tr>
                    {/*//TODO These need to be dynamic*/}
                    <tr>
                        <td>Added Location Name</td>
                        <td>
                            <input type="text" name="field5" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="field6" disabled={true}/>
                        </td>
                        <td>
                            <input type="number" name="field7" min={15} step={15}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Drop off Location</td>
                        <td>
                            <input type="text" name="field9" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="field10" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="field11" value="–" disabled={true}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                    <label>Total Tour Time: </label>
                    <input type="text" name="totalTourTime" defaultValue={totalTravelTime} disabled={true} readOnly/>
            </form>

            {/*<button type="submit">Save</button>*/
            }
            {/*<button type="button" onClick={handleCancel}>Cancel</button>*/
            }
        </div>
    )
        ;
};

export default ItineraryForm;