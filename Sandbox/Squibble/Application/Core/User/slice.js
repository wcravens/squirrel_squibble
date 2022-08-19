import { create, get, update } from '../../Repository.js';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newEntity } from "../../Core.js";

export const createUser  = createAsyncThunk( 'user/created', async  _ => create( newEntity( _ ) ) );
export const getUserById = createAsyncThunk( 'user/fetched', async  _ => get( _ ) );
export const updateUser  = createAsyncThunk( 'user/updated', async  _ => update( _ ) );
