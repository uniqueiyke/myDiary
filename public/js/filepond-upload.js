const photoBtn = document.querySelector('#photo-btn');
const photoDiv = document.querySelector('#photo-div');
const profileImg = document.querySelector('#profile-img');

// Register the plugin
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageValidateSize,
    FilePondPluginFileEncode,
)
  
FilePond.setOptions({
    stylePanelAspectRatio: 487.5 / 325,
    imageTransformOutputQualityMode: 'optional',
    // imageValidateSizeMaxWidth: 300,
    // imageValidateSizeMaxHeight: 450,
    imageResizeTargetWidth: 325,
    imageResizeTargetHeight: 487.5,
    imageResizeUpscale: false
})

if(photoBtn !== null){
    photoBtn.addEventListener('click', e => {
        createFilePondElement(photoDiv);
        photoBtn.remove()
    })
}

if(profileImg !== null){
    profileImg.addEventListener('click', e => {
        createFilePondElement(photoDiv);
    })
}

function createFilePondElement(parentElement = null) {
    const pond = FilePond.create({
        name: 'photo',
        maxFiles: 10,
    });
    // add our pond to the body
    pond.appendTo(parentElement);
}

// const inputElement = document.querySelector('input[type="file"]');
// const pond = FilePond.create( inputElement );
// console.log(inputElement);
// FilePond.parse(document.body);