import { test, expect } from '@playwright/test';
import { oi, ApiServiceType } from "@ordino.ai/ordino-engine";
import { newPet } from '../requests/payloads/petPayloads';

const http = oi.api(ApiServiceType.HTTP);

export class PetService {

    private baseUrl: string = 'https://petstore.swagger.io/v2';
    
    constructor() {
        http.BaseUrl(this.baseUrl);
    }
    
    async addPet() {
        http.setUrl('pet');  
        const response = await http.requestPost(newPet);        
        expect(response).toBeOK();
        const pet = await response.json();
        expect(pet.name).toBe(newPet.name);
        return pet;
    }

    async updatePet(petId: number, updatedPet: any) {
        http.setUrl(`pet/${petId}`);
        const response = await http.requestPut(updatedPet);
        expect(response).toBeOK();
        const pet = await response.json();
        expect(pet.name).toBe(updatedPet.name);
        return pet;
    }
    
    async getPetById(petId: number) {
        http.setUrl(`pet/${petId}`);
        const response = await http.requestGet();
        expect(response).toBeOK();
        const pet = await response.json();

        console.log(`Retrieved pet with ID: ${pet.name}`);
        return pet;
    }

    async findPetsByStatus(status: string) {
        http.setUrl(`pet/findByStatus?status=${status}`);        
        const response = await http.requestGet();
        expect(response).toBeOK();
        const pets = await response.json(); 
        console.log(`Found ${pets.length} pets with status ${status}`);

        pets.forEach((pet: any) => {
            console.log(`Pet ID: ${pet.id}, Name: ${pet.name}, Status: ${pet.status}`);
        });


        return pets;
    }
    



}