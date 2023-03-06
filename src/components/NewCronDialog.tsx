import { FC, useState } from "react";
import {
  Dialog,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Cancel, Check } from "@mui/icons-material";
import PaperDrag from "../components/PaperDrag";
import SelectGrup from "../components/SelectGrup";
import "moment/locale/es";
import { Moment } from "moment";
import createCron from "../utils/createCron";
import { useMutation } from "@tanstack/react-query";

interface NewCronDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  events: any[];
  setEvents: React.Dispatch<any>;
}

const NewCronDialog: FC<NewCronDialogProps> = ({
  open,
  setOpen,
  events,
  setEvents,
}) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endtDate, setEndDate] = useState<Moment | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grups, setGrups] = useState<string[]>([]);

  const createMutate = useMutation(
    async (payload: object) =>
      await createCron(
        "85c199ebb176b1acb0a50b7f0c36d57783957308E47087AC758034736AC4B78DBE617BA5",
        payload
      ),
      {
        onSuccess: (data) => {
          setTitle("");
          setDescription("");
          setGrups([]);
          setOpen(false);
        }
      }
  );


  return (
    <Dialog
      open={open}
      onClose={() => {
        setEvents((old: any) => {
          const newEvents = old.slice(0, -1);
          setTitle("");
          setDescription("");
          setGrups([]);
          return [...newEvents];
        });
        setOpen(false);
      }}
      PaperComponent={PaperDrag}
      aria-labelledby="draggable-dialog-title"
    >
      <Stack gap={1.5} p={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            id="draggable-dialog-title"
            sx={{
              cursor: "move",
            }}
          >
            Nuevo horario
          </Typography>

          <Stack direction="row">
            <IconButton onClick={() => setOpen(false)}>
              <Cancel color="error" />
            </IconButton>
            <IconButton
              onClick={() => {
                const last = events[events.length - 1];
                const payload = {
                  name: last.title,
                  description: last.extendedProps.description,
                  startDate: last.start,
                  endDate: last.end,
                  grup: last.extendedProps.grup,
                };

                createMutate.mutate(payload);
              }}
            >
              <Check color="primary" />
            </IconButton>
          </Stack>
        </Stack>
        <TextField
          label="Titulo"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setEvents((old: any) => {
              const last = old[old.length - 1];
              last.title = e.target.value;
              const newEvents = old.slice(0, -1);
              return [...newEvents, last];
            });
          }}
        />
        <TextField
          label="Descripcion"
          multiline={true}
          minRows={3}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setEvents((old: any) => {
              const last = old[old.length - 1];
              const newEvents = old.slice(0, -1);
              last.extendedProps.description = event.target.value;
              return [...newEvents, last];
            });
          }}
        />

        <SelectGrup
          value={grups}
          onChange={(e) => {
            setEvents((old: any) => {
              const last = old[old.length - 1];
              const newEvents = old.slice(0, -1);
              last.extendedProps.grup = e;
              return [...newEvents, last];
            });
            setGrups(e);
          }}
        />
      </Stack>
    </Dialog>
  );
};

export default NewCronDialog;
