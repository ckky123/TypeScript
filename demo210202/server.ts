import { Repository } from './models/repository';
import { Gender } from './models/gender';

let genderRepository: Repository<Gender> = new Repository<Gender>('Directory', 'Gender');

(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    await genderRepository.createDocument({ name: 'Men', id: undefined });
    await genderRepository.createDocument({ name: 'Women', id: undefined });
    await genderRepository.createDocument({ name: 'None', id: undefined });
    let results = await genderRepository.getDocuments({ query: 'SELECT * FROM root r', parameters: [] });
    console.log('Results');
    console.log(results);
    
    await genderRepository.updateDocument(results[0].id, { id: results[0].id, name: 'Updated' });    
    let updated = await genderRepository.getDocument(results[0].id);
    console.log('First item after an update');
    console.log(updated);

    await genderRepository.deleteDocument(results[0].id);
    console.log('Item deleted');
    let resultsAfterDelete = await genderRepository.getDocuments({ query: 'SELECT * FROM root r', parameters: [] });
    console.log('Results after a delete');
    console.log(resultsAfterDelete);

})();
