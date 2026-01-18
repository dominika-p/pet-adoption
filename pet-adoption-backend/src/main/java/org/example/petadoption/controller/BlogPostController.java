package org.example.petadoption.controller;

import org.example.petadoption.model.BlogPost;
import org.example.petadoption.repository.BlogPostRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogPostController {

    private final BlogPostRepository repository;

    public BlogPostController(BlogPostRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<BlogPost> getAllPosts() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BlogPost> addPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestPart("file") MultipartFile file
    ) throws IOException {

        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadDir = Paths.get("uploads/images");
        Files.createDirectories(uploadDir);
        Files.copy(file.getInputStream(), uploadDir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

        BlogPost post = new BlogPost();
        post.setTitle(title);
        post.setContent(content);
        post.setImg("http://localhost:5000/images/" + filename);

        return ResponseEntity.ok(repository.save(post));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updatePost(@PathVariable Long id, @RequestBody BlogPost updatedPost) {
        return repository.findById(id)
                .map(post -> {
                    post.setTitle(updatedPost.getTitle());
                    post.setContent(updatedPost.getContent());
                    return ResponseEntity.ok(repository.save(post));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getPostById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}