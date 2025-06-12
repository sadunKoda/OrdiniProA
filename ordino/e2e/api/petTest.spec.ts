import { test, expect } from '@playwright/test';
import { PetService } from '../../requests/PetService';

 const petService = new PetService();

test.describe.serial('Pet Store API Tests', () => {

    test('1. Create new pet (POST)' ,async () => {       
        await petService.addPet();
    }) 

    test('2. Get pet by ID (GET)', async () => {       
       await petService.getPetById(5);        
    });

    test('3 find pets by status (GET)', async () => { 
        const pet = await petService.addPet();
        console.log(`Created pet with ID: ${pet.id}`);

         await petService.getPetById(pet.id);
         console.log(`Retrieved pet with ID: ${pet.id}`);

    });
    
});