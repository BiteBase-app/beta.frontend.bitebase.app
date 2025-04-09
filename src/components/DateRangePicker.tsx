import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Props {
  /** Label for the date range picker */
  label: string;
  /** Selected date range */
  dateRange: DateRange | undefined;
  /** Callback when date range changes */
  onChange: (dateRange: DateRange | undefined) => void;
  /** Error message to display */
  error?: string;
  /** Whether the date range picker is disabled */
  disabled?: boolean;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Date format string (date-fns format) */
  dateFormat?: string;
  /** Optional className for additional styling */
  className?: string;
  /** Required field */
  required?: boolean;
  /** Preset ranges to display */
  presets?: {
    label: string;
    range: DateRange;
  }[];
}

/**
 * DateRangePicker component for selecting start and end dates
 * Provides calendar selection with preset ranges
 */
export const DateRangePicker = ({
  label,
  dateRange,
  onChange,
  error,
  disabled = false,
  placeholder = "Select date range",
  dateFormat = "MMM d, yyyy",
  className = "",
  required = false,
  presets,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Format the selected date range for display
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) {
      return placeholder;
    }

    if (!range.to) {
      return format(range.from, dateFormat);
    }

    return `${format(range.from, dateFormat)} - ${format(range.to, dateFormat)}`;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${error ? "border-destructive" : ""}`}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(dateRange)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Preset ranges */}
            {presets && presets.length > 0 && (
              <div className="border-r border-border p-3 space-y-2">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-sm font-normal"
                    onClick={() => {
                      onChange(preset.range);
                      setIsOpen(false);
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            )}

            {/* Calendar picker */}
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onChange}
              numberOfMonths={2}
              disabled={disabled}
            />
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
