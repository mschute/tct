import React from 'react';

const ItineraryForm = ({totalTravelTime, handleStartDateChange, handleEndDateChange, selectedStartDate, selectedEndDate, itinerary, itineraryNote}) => {

    return (
        <div>
            <form>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Trip Date
                        </th>
                        <th>
                            Start Time
                        </th>
                        <th>
                            End Time
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <label>
                                <input type="date" name="tripDate" value={itinerary.tripDate}
                                       onChange={handleStartDateChange} disabled={false}/>
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="time" name="tripStartTime" value={itinerary.tripStartTime}
                                       onChange={handleStartDateChange} disabled={false}/>
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="time" name="tripEndTime" value={itinerary.tripEndTime}
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
                        <th>Location Name</th>
                        <th>Location Address</th>
                        <th>Travel Time</th>
                        <th>Stop Over Time (Min)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Pick up Location</td>
                        <td>
                            {/*<input type="text" name="locationName" value={itinerary.itineraryLocations[0].locationName}*/}
                            {/*       disabled={true}/>*/}
                            <input type="text" name="locationName" defaultValue="Temp location name"
                                   disabled={true}/>

                        </td>
                        <td>
                            {/*<input type="text" name="locationAddress"*/}
                            {/*       value={itinerary.itineraryLocations[0].locationAddress} disabled={true}/>*/}
                            <input type="text" name="locationAddress"
                                   defaultValue="Temp location address" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="travelTime" value="temp travel time" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="stopOver" value="temp stopover" disabled={true}/>
                        </td>
                    </tr>
                    {/*//TODO These need to be dynamic*/}
                    <tr>
                        <td>Added Location Name</td>
                        <td>
                            <input type="text" name="locationName" defaultValue="temp location name" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="locationAddress" defaultValue="temp location address" disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="travelTimeNextLocale" defaultValue="temp travel time" disabled={true}/>
                        </td>
                        <td>
                            <input type="number" name="stopOver" defaultValue="temp stopover" min={15} step={15}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Drop off Location</td>
                        <td>
                            {/*<input type="text" name="locationName"*/}
                            {/*       value={itinerary.itineraryLocations[itineraryLocations.length - 1].locationName}*/}
                            {/*       disabled={true}/>*/}
                            <input type="text" name="locationName"
                                   defaultValue="temp location name"
                                   disabled={true}/>
                        </td>
                        <td>
                            {/*<input type="text" name="locationAddress"*/}
                            {/*       value={itinerary.itineraryLocations[itineraryLocations.length - 1].locationAddress}*/}
                            {/*       disabled={true}/>*/}
                            <input type="text" name="locationAddress"
                                   defaultValue="temp location address"
                                   disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="travelTimeNextLocale" defaultValue="temp travel time"
                                   disabled={true}/>
                        </td>
                        <td>
                            <input type="text" name="stopOver" defaultValue="temp stopover" disabled={true}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <label>Total Tour Time: </label>
                <input type="text" name="totalTourTime" defaultValue={totalTravelTime} disabled={true} readOnly/>
                <br/>
                <label>Itinerary Notes: </label>
                <input type="text" name="itineraryNote" value={itineraryNote} disabled={true}/>
            </form>

            {/*<button type="submit">Save</button>*/
            }
            {/*<button type="button" onClick={handleCancel}>Cancel</button>*/
            }
        </div>
    );
};

export default ItineraryForm;