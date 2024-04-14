import React, {useState} from 'react';
import {Marker} from "@vis.gl/react-google-maps";
import {formatTime, formatToClock} from "../helpers/helpers";
import SignInUpModal from "./SignInUpModal";
//import '../styles/itinerary-form-style.css'

const ItineraryForm = ({ itineraryDTO, handleRouteUpdate, handleTripDateChange, handleStartTimeChange, handleDeleteItineraryButtonClick, handleStopTime }) => {
    const [isSignInUpOpen, setIsSignInUpOpen] = useState(false);
    
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
                                <input type="time" name="tripEndTime" value={formatToClock(itineraryDTO.tripEndTime)} readOnly/>
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
                    {itineraryDTO.locations.map((location, index) => {
                        if (index === 0 || index === itineraryDTO.locations.length - 1)
                        {
                            return (
                                <tr>
                                    <td>
                                        <input type="text" name="locationName"
                                               value={location.stopOrders}
                                               disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="locationName"
                                               value={location.name}
                                               disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="locationAddress"
                                               value={location.address}
                                               disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" name="travelTime"
                                               value={formatTime(location.travelTimeNextLocale)}
                                               disabled={true}
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
                                               value={formatTime(location.travelTimeNextLocale)}
                                               disabled={true}
                                            /*//onChange={() => handle(location)}*/
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <input type="number" name="stopOver"
                                               value={location.stopOver}
                                               disabled={false}
                                               min="0"
                                               step="15"
                                               onChange={(event) => handleStopTime(event, index)}
                                            /*TODO only map middle locations*/
                                        />
                                    </td>
                                    <td>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            handleDeleteItineraryButtonClick(index)}}>
                                            Remove from Itinerary
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
                <br/>
                <label>Total Tour Time: </label>
                <input type="text" name="totalTourTime" value={formatTime(itineraryDTO.totalTravelTime)} disabled={true}
                       readOnly/>
                <br/>
                <label>Itinerary Notes: </label>
                <input type="text" name="itineraryNote" value={itineraryDTO.itineraryNotes} disabled={false}/>
            </form>
            
            <SignInUpModal isOpen={isSignInUpOpen}/>
            
            <button onClick={(event) => {
                setIsSignInUpOpen(true)
                
            }}>Sign In</button>
            <button type="submit">Save</button>
            {/*//TODO implement clear button*/}
            {/*<button type="button" onClick={handleClear}>Clear</button>*/}
        </div>
    );
};

export default ItineraryForm;