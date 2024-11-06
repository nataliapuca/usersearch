import { useMemo } from "react";

interface CreatedDate {
  _seconds: number;
  _nanoseconds: number;
}

const useFormattedDate = (createdDate: CreatedDate) => {
  return useMemo(() => {
    const date = new Date(
      createdDate._seconds * 1000 + createdDate._nanoseconds / 1000000
    );

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }, [createdDate]);
};

export default useFormattedDate;
