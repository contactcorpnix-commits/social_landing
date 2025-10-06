import * as React from "react"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function DateTimePicker({
  value,
  onChange,
  placeholder = "Select date and time",
  className,
  ...props
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(value || new Date())
  const [selectedTime, setSelectedTime] = React.useState(value || new Date())
  const [showTimePicker, setShowTimePicker] = React.useState(false)

  React.useEffect(() => {
    if (value) {
      setSelectedDate(value)
      setSelectedTime(value)
    }
  }, [value])

  const handleDateChange = (date) => {
    if (date) {
      const newDateTime = new Date(date)
      newDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes())
      setSelectedDate(date)
      setSelectedTime(newDateTime)
      setShowTimePicker(true)
      onChange(newDateTime)
    }
  }

  const handleTimeChange = (time) => {
    if (time && selectedDate) {
      const newDateTime = new Date(selectedDate)
      newDateTime.setHours(time.getHours(), time.getMinutes())
      setSelectedTime(newDateTime)
      onChange(newDateTime)
    } else if (time) {
      setSelectedTime(time)
    }
  }

  const formatDateTime = (date) => {
    if (!date) return placeholder
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const clearSelection = () => {
    setSelectedDate(new Date())
    setSelectedTime(new Date())
    setShowTimePicker(false)
    onChange(null)
    setOpen(false)
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const finalDateTime = new Date(selectedDate)
      finalDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes())
      onChange(finalDateTime)
      setOpen(false)
    }
  }

  const isValidDateTime = selectedDate && selectedTime

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
          <Calendar className="mr-2 h-4 w-4" />
          {formatDateTime(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4 min-w-[280px]">
          {/* Date Selection - Always visible initially */}
          <div className={`transition-all duration-300 ease-in-out ${showTimePicker ? 'opacity-60 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Select Date</label>
            </div>
            <DatePicker
              selected={selectedDate}
              onSelect={handleDateChange}
              placeholder="Choose a date"
              autoClose={true}
            />
          </div>
          
          {/* Time Selection - Appears after date selection */}
          <div className={`transition-all duration-500 ease-in-out ${showTimePicker ? 'opacity-100 max-h-96 mt-4' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">Select Time</label>
              </div>
              <TimePicker
                value={selectedTime}
                onChange={handleTimeChange}
                placeholder="Choose a time"
              />
            </div>
          </div>

          {/* Confirmation Section - Appears after both date and time are selected */}
          <div className={`transition-all duration-500 ease-in-out ${showTimePicker ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="pt-3 border-t border-border">
              <div className="text-sm text-muted-foreground mb-3 p-3 bg-muted/50 rounded-lg border border-border">
                <div className="font-medium text-foreground mb-1">Scheduled Time:</div>
                <div className="text-primary">
                  {selectedDate && selectedTime ? 
                    formatDateTime(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime.getHours(), selectedTime.getMinutes()))
                    : 'Please select date and time'
                  }
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleConfirm}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Confirm Selection
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearSelection}
                  className="border-border"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DateTimePicker }