import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import getDevices from "../utils/getDevices";

interface SelectGrupProps {
  value: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
}



const SelectGrup: FC<SelectGrupProps> = ({
  value: devicesName,
  onChange: setDeviceName,
}) => {
  
  const { data: devices, isLoading } = useQuery(["devices"], async () =>
    getDevices(
      "85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5"
    ),
  );

  const names = Object.keys(devices || {}).filter(name => name !== "Sin Grupo")

  if (isLoading) {
    return <Skeleton variant="rectangular" height={44} />
  }

  const handleChange = (event: SelectChangeEvent<typeof devicesName>) => {
    const {
      target: { value },
    } = event;
    setDeviceName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-grup-label">Grupos</InputLabel>
        <Select
          labelId="multiple-grup-label"
          id="multiple-grup"
          fullWidth
          multiple
          value={devicesName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


export default SelectGrup;
