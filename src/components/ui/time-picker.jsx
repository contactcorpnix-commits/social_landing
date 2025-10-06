import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  className,
  ...props
}) {
  const [open, setOpen] = React.useState(false)
  const [hours, setHours] = React.useState(value ? value.getHours() : new Date().getHours())
  const [minutes, setMinutes] = React.useState(value ? value.getMinutes() : new Date().getMinutes())

  React.useEffect(() => {
    if (value) {
      setHours(value.getHours())
      setMinutes(value.getMinutes())
    }
  }, [value])

  const handleTimeChange = (newHours, newMinutes) => {
    const newDate = new Date()
    newDate.setHours(newHours, newMinutes, 0, 0)
    onChange(newDate)
  }

  const handleHoursChange = (e) => {
    const newHours = parseInt(e.target.value)
    setHours(newHours)
    handleTimeChange(newHours, minutes)
  }

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value)
    setMinutes(newMinutes)
    handleTimeChange(hours, newMinutes)
  }

  const formatTime = (date) => {
    if (!date) return placeholder
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const hoursOptions = Array.from({ length: 24 }, (_, i) => i)
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          {...props}
        >
          <Clock className="mr-2 h-4 w-4" />
          {formatTime(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Hour</label>
              <select
                value={hours}
                onChange={handleHoursChange}
                className="w-20 h-10 border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {hoursOptions.map(hour => (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end pb-1">
              <span className="text-lg font-medium">:</span>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Minute</label>
              <select
                value={minutes}
                onChange={handleMinutesChange}
                className="w-20 h-10 border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {minutesOptions.map(minute => (
                  <option key={minute} value={minute}>
                    {minute.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button
              size="sm"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }