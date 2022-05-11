describe("Blog app", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/testing/reset")

      const user = {
        name: "Jin",
        username: "Jinneon",
        password: "pass"
      }
      cy.request("POST", "http://localhost:3003/api/users", user)

      cy.visit("http://localhost:3000/")
    })
  
    it("Login form is visible", function() {
      cy.contains("Login")
      cy.get("#username")
      cy.get("#password")
      cy.get("button").contains("Login")
    })

//5.18
    describe("login", function() {
        it("Login works)", function() {
          cy.get("#username").type("Jinneon")
          cy.get("#password").type("pass")
          cy.get("button").contains("Login").click()
    
          cy.contains("Jin showed up")
        })
    
        it("Login should fail here", function() {
          cy.get("#username").type("Jinneon")
          cy.get("#password").type("incorrectPass")
          cy.get("button").contains("Login").click()
    
          cy.get(".error")
            .should("contain", "Failed login")
            .should("have.css", "color", "rgb(255, 0, 0)")
        })
      })
//5.19
      describe("During login", function() {
        beforeEach(function() {
          cy.get("#username").type("Jinneon")
          cy.get("#password").type("pass")
          cy.get("button").contains("Login").click()
    
          cy.contains("Jin showed up")
        })
    //5.20
        it("User should be able to create blog", function() {
         
          cy.get("button").contains("New blog").click()
    
          cy.contains("Add a new blog?")
    
          cy.get("#title").type("Fishing Season")
          cy.get("#url").type("http://www.google.com")
          cy.get("#author").type("Fisher")
          cy.get("#addBlog").click()
    
          cy.get(".error").contains("\"Fishing Season\" by Fisher added ")
          cy.get(".hideData").contains("Fishing Season by Fisher")
        })
      })

      it("User can like  blog ", function() {
        cy.get("#username").type("Jinneon")
        cy.get("#password").type("pass")
        cy.get("button").contains("Login").click()
  
        cy.contains("Jin showed up")

        cy.get("button").contains("New blog").click()
    
        cy.contains("Add a new blog?")
  
        cy.get("#title").type("Yo Yo")
        cy.get("#url").type("http://www.google.com")
        cy.get("#author").type("Fish pro")
        cy.get("#addBlog").click()
  
        cy.get(".error").contains("\"Yo Yo\" by Fish pro added ")
        cy.get(".hideData").contains("Yo Yo by Fish pro")
      

        cy.get("#view").click()
        cy.get("#like").click()

        cy.get(".error").contains("Liked \"Yo Yo\" ")
        cy.contains("Likes: 1")
      })

      it("User who created blog should be able to delete it", function() {
        cy.get("#username").type("Jinneon")
        cy.get("#password").type("pass")
        cy.get("button").contains("Login").click()
  
        cy.contains("Jin showed up")
        cy.get("button").contains("New blog").click()
    
        cy.contains("Add a new blog?")
  
        cy.get("#title").type("Yo Yo")
        cy.get("#url").type("http://www.google.com")
        cy.get("#author").type("fish pro")
        cy.get("#addBlog").click()
  
        cy.get(".error").contains("\"Yo Yo\" by fish pro added ")
        cy.get(".hideData").contains("Yo Yo by fish pro")
        cy.get("#view").click()
        cy.get("#remove").click()

        cy.get(".error").contains("Deleted blog \"Yo Yo\" ")
        cy.get("#view").should("not.exist")
      })

      describe("Multiple blogs", function() {
        beforeEach(function() {
            cy.get("#username").type("Jinneon")
            cy.get("#password").type("pass")
            cy.get("button").contains("Login").click()
      
            cy.contains("Jin showed up")
          cy.postBlog({ title: "FishMid", url: "https://www.google.com", likes: 76, author: "Jinneon" })
          cy.postBlog({ title: "FishLow", url: "https://www.google.com", author: "Jinneon" })
          cy.postBlog({ title: "FishMostL", url: "https://www.google.com", likes: 77, author: "Jinneon" })
        })
  
        it("Blogs with most likes get shown first", function() {
          // default
          cy.get(".blog").eq(0).should("contain", "FishMostL")
          cy.get(".blog").eq(1).should("contain", "FishMid").as("midFish")
          cy.get(".blog").eq(2).should("contain", "FishLow")

          cy.get("@midFish").find("#view").click()
          cy.get("@midFish").find("#like").click()
          cy.get("@midFish").contains("Likes: 77")

          cy.get(".blog").eq(0).should("contain", "FishMid")
          cy.get(".blog").eq(1).should("contain", "FishMostL")
          cy.get(".blog").eq(2).should("contain", "FishLow")
        })
      })
    
  }) 