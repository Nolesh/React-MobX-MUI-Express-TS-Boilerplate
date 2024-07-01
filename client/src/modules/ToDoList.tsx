import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { request } from '../utils/Rest'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItemButton, ListItemText, TextField } from '@mui/material';

import { TItemData } from '../../../shared/types';
import { TODO_ROUTE } from '../../../shared/routes';

const Container = styled('div')({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '21px',
    fontWeight: 'bold',
    height: 400,
    justifyContent: 'center',
    position: 'relative',
    width: '100%'
});

const ControlButton = styled(Button)({
    margin: 10,
})

type THandleListItemClick = (index: number) => void;


const generateListItems = (items: TItemData[], onClick: THandleListItemClick, selectedIndex: number) => {
    return (
        items.map((x, i) =>
            <ListItemButton
                key={`listItem-${i}`}
                selected={selectedIndex === i}
                onClick={(e) => onClick(i)}
            >
                <ListItemText primary={x.title} secondary={x.desc} />
            </ListItemButton>
        ))
}


interface IDialogProps {
    open: boolean;
    title: string;
    selectedItem?: TItemData;
    onClose: () => void;
    onConfirm: (form: TItemData) => void;
    dialogType: 'AddOrEdit' | 'Delete';
}



function MyDialog(props: IDialogProps) {
    const { onClose, onConfirm, dialogType, title, open, selectedItem = { title: '', desc: '' } } = props;

    const [item, setItem] = useState<TItemData>(selectedItem);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItem({ ...item, ...{ [e.target.name]: e.target.value } });
    }

    useEffect(() => {
        if (open) setItem(selectedItem ? selectedItem : { title: '', desc: '' });
    }, [open])

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                {
                    dialogType === 'AddOrEdit' ?
                        <>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="title"
                                label="Title"
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={item.title}
                            />
                            <TextField
                                required
                                margin="dense"
                                name="desc"
                                label="Description"
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={item.desc}
                            />
                        </>
                        :
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete selected item?
                        </DialogContentText>
                }
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={e => onConfirm(item)}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}


export default function () {

    const [items, setItems] = useState<TItemData[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(4);
    const [openDialog, setOpenDialog] = React.useState(false);

    useEffect(() => {
        getItems();
    }, [])

    const getItems = () => {
        request(`${TODO_ROUTE}`).then(res => setItems(res.content)).catch(e => console.error(e));
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddItemDialog = (item: TItemData) => {
        request(`${TODO_ROUTE}`, 'POST', item).then((res) => setItems(res.content));
        handleCloseDialog();
    }

    const handleEditItemDialog = (item: TItemData) => {
        request(`${TODO_ROUTE}/${selectedIndex}`, 'PATCH', item).then((res) => setItems(res.content));
        handleCloseDialog();
    }

    const handleDelItemDialog = () => {
        request(`${TODO_ROUTE}/${selectedIndex}`, 'DELETE').then((res) => setItems(res.content));
        handleCloseDialog();
    }

    const handleListItemClick: THandleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    const add = () => {
        dialogDataRef.current = {
            confirmCmd: handleAddItemDialog,
            title: 'Add new item',
            dialogType: 'AddOrEdit'
        }
        setOpenDialog(true);
    }

    const edit = () => {
        dialogDataRef.current = {
            selectedItem: items[selectedIndex],
            confirmCmd: handleEditItemDialog,
            title: 'Edit item',
            dialogType: 'AddOrEdit'
        }
        setOpenDialog(true);
    }

    const del = () => {
        dialogDataRef.current = {
            confirmCmd: handleDelItemDialog,
            title: 'Delete confirmation',
            dialogType: 'Delete'
        }
        setOpenDialog(true);
        setSelectedIndex(-1);
    }

    const dialogDataRef = useRef<{
        selectedItem?: TItemData,
        confirmCmd: (item: TItemData) => void,
        title: string,
        dialogType: IDialogProps['dialogType']
    }>({
        selectedItem: undefined,
        confirmCmd: handleAddItemDialog,
        title: '',
        dialogType: 'AddOrEdit'
    });


    const notSelected = selectedIndex === -1 || selectedIndex > items.length - 1;

    return (
        <Container>
            <div style={{ width: '200px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <ControlButton variant="contained" onClick={e => add()}>Add</ControlButton>
                <ControlButton variant="contained" onClick={e => edit()} disabled={notSelected}>Edit</ControlButton>
                <ControlButton variant="contained" onClick={e => del()} sx={{ backgroundColor: '#f77', '&:hover': { backgroundColor: '#f44' } }} disabled={notSelected}>Delete</ControlButton>

            </div>
            <div style={{ width: '300px', height: '100%' }}>

                <List
                    sx={{                        
                        maxWidth: 360,
                        minWidth: 280,
                        height: '100%',
                        padding: 0,
                        bgcolor: 'background.paper',
                        border: '1px solid #aaa',
                        borderRadius: 2,
                        overflow: 'auto',
                    }}
                >
                    {
                        generateListItems(items, handleListItemClick, selectedIndex)
                    }
                </List>

            </div>

            <MyDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={dialogDataRef.current.confirmCmd}
                title={dialogDataRef.current.title}
                selectedItem={dialogDataRef.current.selectedItem}
                dialogType={dialogDataRef.current.dialogType}
            />
        </Container>
    );
}