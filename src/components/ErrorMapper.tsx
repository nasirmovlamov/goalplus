import React, { useMemo } from "react";

type Props = {
  error: any;
  fieldName?: any;
};

const ErrorMapper = ({ error, fieldName }: Props) => {
  return (
    <div className="w-full">
      {error &&
        ("status" in error ? (
          <div>
            <div>
              {error?.data &&
                Object.keys(error.data).map((key) => {
                  return (
                    <p key={key} className="text-red-500">
                      {fieldName ?? ""}
                      {error.data[key]}
                    </p>
                  );
                })}
            </div>
          </div>
        ) : null)}
    </div>
  );
};

export default ErrorMapper;
