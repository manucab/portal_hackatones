import { useState, useEffect } from "react"

function useCountdown(count) {
    const [seconds, setSeconds] = useState(count)

    useEffect(() => {
        const t = setInterval(() => {
            setSeconds(seconds => seconds - 1)
        }, 1000)
        return () => {
            clearInterval(t)
        }

    }, [])

        return seconds;
}

export default useCountdown