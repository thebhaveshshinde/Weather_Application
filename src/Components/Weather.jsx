import { useState } from "react"


function Weather() {
    const [City, setCity] = useState("")
    const [Weather, setWeather] = useState()


    const FindCityWeather = async () => {
        const API_KEY = import.meta.env.VITE_WEATHER_API
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}&units=metric`)

        if (!response.ok) {
            return alert("Error To Find Weather !")
        }

        const data = await response.json()
        setWeather(data)
    }

    return (
        <>
            <div className="bg-[url(/Background_Image2.jpg)] bg-no-repeat bg-center bg-cover bg-center min-h-screen">
                <div className="flex justify-center items-center items-center relative top-6" >
                    <label className="text-2xl   font-bold font-bold ">City:</label>
                    <input className="border-2 font-semibold  border-red-900  rounded-sm" type="text" value={City} onChange={(e) => setCity(e.target.value)} required />
                    <button className="ml-1 bg-red-500 mr-1 border-slate-50 border-2 p-1 text-xl font-black rounded-md" onClick={FindCityWeather}>Search</button>
                </div><br /><br />

                <div >
                    {Weather && (
                        <div>
                            <div className=" relative m-4  sm:flex-col sm:flex sm:justify-center sm:items-center">
                                <h1 className="text-6xl text-slate-50 font-bold"> {Weather.name}, {Weather.sys.country}</h1><br />
                                <span>
                                    <h2 className="text-5xl text-slate-50 font-bold">{Weather.main.temp}°C , {Weather.weather[0].description}</h2>
                                    <img className="h-60 w-60" src={`http://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`} />
                                </span>
                            </div>
                            <div className="flex flex-col justify-center items-center w-screen text-center">
                                <div className="bg-[url(/Background_Image4.jpg)]  bg-center bottom-6 absolute md:bottom-10  w-3/4 md:w-2/4 ">
                                    <h2 className="text-slate-800 font-bold text-2xl">Feels Like: {Weather.main.feels_like}°C</h2>
                                    <h2 className="text-slate-800 font-bold text-2xl">Humidity: {Weather.main.humidity}%</h2>
                                    <h2 className="text-slate-800 font-bold text-2xl">Visibility:{Weather.visibility / 1000}km.</h2>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Weather
