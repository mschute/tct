import React from 'react';
import {Marker} from "@vis.gl/react-google-maps";
//import '../styles/itinerary-form-style.css'

const ItineraryForm = ({ itineraryDTO, handleRouteUpdate, handleTripDateChange, handleStartTimeChange, handleEndTimeChange }) => {
    
    
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
                                <input type="date" name="tripDate" value={itineraryDTO.tripDate}
                                       onChange={handleTripDateChange} disabled={false}/>
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="time" name="tripStartTime" value={itineraryDTO.tripStartTime}
                                       onChange={handleStartTimeChange} disabled={false}/>
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="time" name="tripEndTime" value={itineraryDTO.tripEndTime}
                                       onChange={handleEndTimeChange}
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
                    {/*<tr>*/}
                    {/*    <td>Pick up Location</td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="locationName"*/}
                    {/*               value={itineraryDTO.locations[0].name}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="locationAddress"*/}
                    {/*               value={itineraryDTO.locations[0].address}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="travelTime"*/}
                    {/*               value={itineraryDTO.locations[0].travelTimeNextLocale}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="stopOver"*/}
                    {/*               value={itineraryDTO.locations[0].stopOver}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    {itineraryDTO.locations.map((location, index) => {
                        if (index === 0 || index === itineraryDTO.locations.length - 1)
                        {
                            return (
                                <tr>
                                    <td>
                                        <input type="text" name="locationName"
                                               value={location.stopOrders}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="locationName"
                                               value={location.name}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="locationAddress"
                                               value={location.address}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="travelTime"
                                               value={location.travelTimeNextLocale}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="stopOver"
                                               value={location.stopOver}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                </tr>
                            )
                        }
                            return (
                                <tr>
                                    <td>
                                        <input type="text" name="locationName"
                                               value={location.stopOrders}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="locationName"
                                               value={location.name}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="locationAddress"
                                               value={location.address}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="travelTime"
                                               value={location.travelTimeNextLocale}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="stopOver"
                                               value={location.stopOver}
                                               disabled={false}
                                               min={0}
                                               step={15}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    {/*<tr>*/}
                    {/*    <td>Drop off Location</td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="locationName"*/}
                    {/*               value={itineraryDTO.locations[itineraryDTO.locations.length - 1].name}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="locationAddress"*/}
                    {/*               value={itineraryDTO.locations[itineraryDTO.locations.length - 1].address}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="travelTime"*/}
                    {/*               value={itineraryDTO.locations[itineraryDTO.locations.length - 1].travelTimeNextLocale}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*    <td>*/}
                    {/*        <input type="text" name="stopOver"*/}
                    {/*               value={itineraryDTO.locations[itineraryDTO.locations.length-1].stopOver}*/}
                    {/*               disabled={true}/>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    </tbody>
                </table>
                <br/>
                <label>Total Tour Time: </label>
                <input type="text" name="totalTourTime" defaultValue={itineraryDTO.totalTravelTime} disabled={true}
                       readOnly/>
                <br/>
                <label>Itinerary Notes: </label>
                <input type="text" name="itineraryNote" value={itineraryDTO.itineraryNotes} disabled={false}/>
            </form>

            {/*<button type="submit">Save</button>*/
            }
            {/*<button type="button" onClick={handleCancel}>Cancel</button>*/
            }
        </div>
    );
};

export default ItineraryForm;