import { Sidebar } from "../components/Sidebar"
import { useAuthentication } from "../Auth"
import { useState } from "react";
import { EventPush } from "../functions/Events";

export const EventCreate = () => {

    const [user] = useAuthentication();
    const dm = user.displayName;

    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        limit: 0,
        image: "",
        system: "",
        when: ""
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const rpgData = {
          ...formData,
          dm: dm,

        
        };
        EventPush(rpgData);
      };

    return (
        <main className='app-content d-flex'>
        <Sidebar activePage='Create' />
        <section className="l-sec l-sec--event-create">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form className="event-form event-form--add">
                        
                            <label htmlFor="name">
                                <p>Give us a Title of the game:</p>
                                <input onChange={(e) => {handleChange(e)}} type="text" name="name" id="name" className="btn btn--search" />
                            </label>
                            <label htmlFor="desc">
                                <p>Describe about what it is:</p>
                                <textarea onChange={(e) => {handleChange(e)}} name="desc" className="btn btn--search textarea" id="desc"></textarea>
                            </label>
                            <label htmlFor="image">
                                <p>Url of the image:</p>
                                <input type="text" onChange={(e) => {handleChange(e)}} className="btn btn--search image" name="image" id="image-url" />
                            </label>
                            <div className="d-flex">
                                <label htmlFor="limit" className="limit">
                                    <p>Max number o players:</p>
                                    <input type="number" onChange={(e) => {handleChange(e)}} className="btn btn--search number" name="limit" id="limit" min='0' max='10' />
                                </label>
                                <label htmlFor="system" className="system">
                                    <p>Choose your system:</p>
                                    <select name="system" onChange={(e) => {handleChange(e)}} className="btn btn--seg" id="game-cat">
                                        <option value="dnd">Dungeos and Dragon</option>
                                        <option value="coc">Call of Cthulhu</option>
                                        <option value="lotr">One Ring</option>
                                        <option value="war">Warhammer</option>
                                        <option value="path">Pathfinder</option>
                                        <option value="cus">custom</option>
                                    </select>
                                </label>
                            </div>
                            <label htmlFor="system">
                                <p>Write location (for example Olsztyn, Warmińsko Mazurskie):</p>
                                <input onChange={(e) => {handleChange(e)}} type="text" name="name" id="name" className="btn btn--search" />
                            </label>
                            <label htmlFor="when">
                                <p>Pick a date when:</p>
                                <input type="date" onChange={(e) => {handleChange(e)}} className="btn btn--search image" name="date-take" id="date-take" />
                            </label>
                            <button onClick={(e) => {handleSubmit(e)}} className="btn btn-primary">Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </main>
    )
}