import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import useSWR from "swr";

const BitrateGraph = () => {
    const [chartData, setChartData] = useState({});
    const [timestamps, setTimestamps] = useState([]);
    const [video, setVideo] = useState([]);
    const [audio, setAudio] = useState([]);

    const token = sessionStorage.getItem('token');
    const streamname = sessionStorage.getItem('streamname');

    const options = {
        method: 'GET',
        url: 'https://metrics.nanocosmos.de/api/v1/monitoring/ingest/bitrate/',
        params: { streams: streamname },
        headers: {
            Accept: 'application/json',
            'x-access-token': token,
        },
    }

    function convertTimestamps(value) {
        var date = new Date(value * 1000);
        var options = { hour: "numeric", minute: "numeric", second: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    const fetchTerm = (url) =>
        axios.request(options).then(res =>
            res.data.data[0]
        )

    const { data } = useSWR('https://metrics.nanocosmos.de/api/v1/monitoring/ingest/bitrate/', fetchTerm, { refreshInterval: 30000 },)

    function getData() {
        if (data != undefined) {
            let fields = data.values
            fields.map((value) => {
                setAudio(audio => [...audio, value.audio.kbits])
                setVideo(video => [...video, value.video.kbits])
                setTimestamps(timestamps => [...timestamps, convertTimestamps(value.timestamp)])
            })
        }
    }

    useEffect(() => {
        setChartData({
            labels: timestamps,
            datasets: [
                {
                    label: "Video Bitrate in k/bits",
                    data: video,
                    borderWidth: 4,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",

                },
                {
                    label: "Audio Bitrate in k/bits",
                    data: audio,
                    backgroundColor: ["rgba(255, 0, 0, 0.6)"],
                    borderWidth: 4,
                    fill: false,
                    borderColor: "#742774"
                },
            ]
        })
    }, [audio])

    useEffect(() => {
        getData();
    }, [data])

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="App">
            <h1>Bitrate Graph</h1>
            <div>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: "Bitrates of Audio and Video", display: true },
                    }}
                />
            </div>
        </div>
    );
};

export default BitrateGraph;